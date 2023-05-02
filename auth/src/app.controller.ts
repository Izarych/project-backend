import { Body, Controller, Get, Inject, Param, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AuthDto } from './dto/auth.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('/login')
  async login(@Body() dto: AuthDto, @Res() res: Response) {
    try {
      // const authDto = req.body;
      // const userData = await this.appService.login(authDto);
      const userData = await this.appService.login(dto);
      
      //res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      return res.json(error.response)
    }
  }

  @Get('/check/:email')
  async checkEmail(@Param('email') email: string) {
    return this.appService.checkEmail(email);
  }

  // @Post('/logout')
  // async logout(@Req() req: Request, @Res() res: Response) {
  //   try {
  //     const refreshToken = req.headers.cookie.split('=')[1];
  //     const token = await this.appService.logout(refreshToken);
  //     res.clearCookie('refreshToken');
  //     return res.json(token);
  //   } catch (error) {
  //     return res.json(error.response)
  //   }
  // }

  // @Get('/refresh')
  // async refresh(@Req() req: Request, @Res() res: Response) {
  //   try {
  //     if (!req.headers.cookie) {
  //       throw new UnauthorizedException({ message: 'Not authorized' });
  //     }
  //     const refreshToken = req.headers.cookie.split('=')[1];
  //     const userData = await this.appService.refresh(refreshToken);
  //     res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
  //     return res.json(userData);
  //   } catch (error) {
  //     return res.json(error.response)
  //   }
  // }

  // @Post('/registration')
  // async registration(@Body() dto: AuthDto) {
  //   return this.appService.registration(dto);
  // }
}
