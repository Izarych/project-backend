import {BadRequestException, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {ClientProxy} from '@nestjs/microservices';
import {InjectModel} from '@nestjs/sequelize';
import {AuthDto} from './dto/auth.dto';
import {Token} from './token/token.model';
import * as bcrypt from 'bcryptjs';
import {firstValueFrom} from 'rxjs';
import {Model} from "sequelize-typescript";

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService,
              @InjectModel(Token) private tokenRepository: typeof Token,
              @Inject('AUTH_SERVICE') private userService: ClientProxy) { }

  async login(dto: AuthDto) {

    const user = await this.checkEmail(dto.email);

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const isPasswordEquals = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordEquals) {
      throw new BadRequestException('Invalid password');
    }

    return await this.generateAndSaveTokenAndPayload(user);
  }

  async checkEmail(email: string) {
    return await firstValueFrom(this.userService.send('get.user.email', email));
  }

  async logout(refreshToken: string) {
    await this.tokenRepository.destroy({ where: { refreshToken } });
  }

  async refresh(refreshToken: string) {
    const userData = await this.validateRefreshToken(refreshToken);
    const tokenFromDB = this.tokenRepository.findOne({ where: { refreshToken } });

    if (!userData || !tokenFromDB) {
      throw new UnauthorizedException({ message: 'No auth' });
    }

    const user = await this.checkEmail(userData.email);
    return await this.generateAndSaveTokenAndPayload(user);
  }

  async registration(dto: AuthDto) {
    if (await this.checkEmail(dto.email)) {
      throw new BadRequestException('User with such email exists');
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await firstValueFrom(this.userService.send('create.user', { ...dto, password: hashPassword }));
    console.log(user);
    return this.generateAndSaveTokenAndPayload(user);
  }

  private async generateToken(user) {
    const payload = { userId: user.id, email: user.email, isActivated: user.isActivated };
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
  private async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({ where: { userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return await this.tokenRepository.create({userId, refreshToken});
  }

  private async validateAccessToken(token: string) {
    try {
      return await this.jwtService.verify(token, {secret: process.env.JWT_ACCESS_SECRET});
    } catch (error) {
      return null;
    }
  }
  private async validateRefreshToken(token: string) {
    try {
      return await this.jwtService.verify(token, {secret: process.env.JWT_REFRESH_SECRET});
    } catch (error) {
      return null;
    }
  }

  private async generateAndSaveTokenAndPayload(user: any) {
    const tokens = await this.generateToken(user);
    await this.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        isActivated: user.isActivated
      }
    };
  }

}



