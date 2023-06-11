import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { AuthDto } from './dto/auth.dto';
import { Token } from './token/token.model';
import * as bcrypt from 'bcryptjs';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as uuid from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { IUserWithTokens } from './interfaces/IuserWithTokens';
import { ITokens } from './interfaces/Itokens';
import { IUser } from './interfaces/Iuser';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService,
    private readonly httpService: HttpService,
    @InjectModel(Token) private tokenRepository: typeof Token,
    @Inject('AUTH_SERVICE') private userService: ClientProxy,
    private readonly mailerService: MailerService) { }

  async login(dto: AuthDto): Promise<IUserWithTokens> {
    const user: IUser = await this.checkEmail(dto.email);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const isPasswordEquals: boolean = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordEquals) {
      throw new BadRequestException('Invalid password');
    }

    return await this.generateAndSaveTokenAndPayload(user);
  }

  async checkEmail(email: string): Promise<IUser> {
    return await firstValueFrom(this.userService.send('get.user.email', email));
  }

  async logout(refreshToken: string): Promise<void> {
    await this.tokenRepository.destroy({ where: { refreshToken } });
  }

  async refresh(refreshToken: string): Promise<IUserWithTokens> {
    const userData = await this.validateRefreshToken(refreshToken);
    const tokenFromDB = this.tokenRepository.findOne({ where: { refreshToken } });
    if (!userData || !tokenFromDB) {
      throw new UnauthorizedException({ message: 'No auth' });
    }

    const user: IUser = await this.checkEmail(userData.email);
    return await this.generateAndSaveTokenAndPayload(user);
  }

  async registration(dto: AuthDto): Promise<IUserWithTokens> {
    if (await this.checkEmail(dto.email)) {
      throw new BadRequestException('User with such email exists');
    }
    const hashPassword: string = await bcrypt.hash(dto.password, 5);
    const link: string = uuid.v4();
    const user: IUser = await firstValueFrom(this.userService.send('create.user', { ...dto, password: hashPassword, activationLink: link }));

    if (!user.id) {
      throw new BadRequestException(user);
    }

    // await this.sendActivationLink(dto.email, link);
    return await this.generateAndSaveTokenAndPayload(user);
  }

  async registrationAdmin(dto: AuthDto): Promise<IUserWithTokens> {
    if (await this.checkEmail(dto.email)) {
      throw new BadRequestException('User with such email exists');
    }
    const hashPassword: string = await bcrypt.hash(dto.password, 5);
    const link: string = uuid.v4();
    const admin: IUser = await firstValueFrom(this.userService.send('create.admin', { ...dto, password: hashPassword, activationLink: link }));

    
    if (!admin.id) {
      throw new BadRequestException(admin);
    }
    // await this.sendActivationLink(dto.email, link);
    return await this.generateAndSaveTokenAndPayload(admin);
  }

  async hashNewPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 5);
  }


  async activate(link: string): Promise<IUser> {
    const user: IUser = await firstValueFrom(this.userService.send('activate.user', link));

    if (!user.id) {
      throw new BadRequestException(user);
    }

    return user;
  }

  async reSendActivationLink(email: string): Promise<IUser> {
    const link: string = uuid.v4();
    const user: IUser = await firstValueFrom(this.userService.send('update.user', { email, link }));
    if (!user.id) {
      throw new BadRequestException(user);
    }

    //await this.sendActivationLink(email, link);
    return user;
  }

  private async sendActivationLink(to: string, link: string): Promise<void> {
    this.mailerService
      .sendMail({
        to: `${to}`,
        from: process.env.MAIL_ACC,
        subject: `Activation link for ${process.env.MAIL_REDIRECT_URI}`, // ЗАГЛУШКА
        html: `<h1>This is your activation link</h1><a href="${process.env.MAIL_REDIRECT_URI}/activate/${link}">CLICK HERE</a>`,  //Заглушка
      })
      .then(() => { })
      .catch((error) => console.log(error));
  }

  private async generateToken(user: IUser): Promise<ITokens> {

    const payload = { userId: user.id, email: user.email, isActivated: user.isActivated, roles: user.roles };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign({
        ...payload
      },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: '30s',
        }),
      this.jwtService.sign({
        ...payload
      },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '10d',
        }
      )
    ]);

    return {
      accessToken,
      refreshToken
    };
  }



  private async saveToken(userId: number, refreshToken: string): Promise<Token> {
    const tokenData: Token = await this.tokenRepository.findOne({ where: { userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }
    return await this.tokenRepository.create({ userId, refreshToken });
  }

  private async validateRefreshToken(token: string): Promise<any | null> {
    try {
      return await this.jwtService.verify(token, { secret: process.env.JWT_REFRESH_SECRET });
    } catch (error) {
      return null;
    }
  }

  private async generateAndSaveTokenAndPayload(user: any): Promise<IUserWithTokens> {
    const tokens: ITokens = await this.generateToken(user);
    await this.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        isActivated: user.isActivated,
        roles: user.roles
      }
    };
  }

  loginGmail(req: any): any {
    if (!req.user) {
      throw new BadRequestException('No user from google');
    }

    return req.user;
  }

  async getVkToken(code: string): Promise<any> {
    const res = await firstValueFrom(this.httpService
      .get(
        `https://oauth.vk.com/access_token?&` +
        `client_id=${process.env.VK_CLIENT_ID}&` +
        `client_secret=${process.env.VK_CLIENT_SECRET}&` +
        `redirect_uri=${process.env.REDIRECT_URI_VK}&` +
        `code=${code}`
      ));

    return res.data;
  }
}