import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { AuthDto } from './dto/auth.dto';
import { Token } from './token/token.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService, @InjectModel(Token) private tokenRepository: typeof Token, @Inject('AUTH_SERVICE') private userService: ClientProxy) { }

  async login(dto: AuthDto) {

    //const user = this.userService.send('get.user.email', dto.email);
    //return this.userService.send('get.user.email', dto.email);
    //console.log(createTokenResponse);



    // const user = await this.userService.send('get.user.email', dto.email);
    // if (!user) {
    //   throw new BadRequestException('User does not exist');
    // }

    // const isPasswordEquals = await bcrypt.compare(dto.password, user.password);
    // if (!isPasswordEquals) {
    //   throw new BadRequestException('Invalid password');
    // }
  }

  async checkEmail(email: string) {
    return this.userService.send('get.user.email', email);
  }

}
