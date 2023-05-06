import { Body, Controller, Get, Param, Post, Query, Req, Res, UnauthorizedException, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly httpService: HttpService) { }

  @Post('/login')
  async login(@Body() dto: AuthDto, @Res() res: Response) {
    try {
      const userData = await this.appService.login(dto);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      return res.json(error.response)
    }
  }

  @Get('/sendlink/:email')
  async resendLink(@Param('email') email: string) {
    return this.appService.reSendActivationLink(email);
  }

  @Get('/activate/:link')
  async test(@Param('link') link: string) {
    return this.appService.activate(link);
  }

  @Get('login_gmail')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('login_gmail_success')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.gmailLogin(req)
  }

  @Get('/login_vk')
  async auth(@Res() res: Response) {
    const host =
      process.env.NODE_ENV === 'prod'
        ? process.env.APP_HOST
        : process.env.APP_LOCAL;

    return res.redirect(`https://oauth.vk.com/authorize?client_id=${process.env.VK_CLIENT_ID}&display=page&redirect_uri=${host}/login_vk_success&scope=offline&response_type=code&v=5.92`);
  }

  @Get('/login_vk_success')
  async code(@Query('code') code: string, @Res() res: Response) {
    const host =
    process.env.NODE_ENV === 'prod'
      ? process.env.APP_HOST
      : process.env.APP_LOCAL;
    return res.json((await firstValueFrom(this.httpService.post(`${host}/login/vk`, {code}))).data)
  }

  @Post('/login/vk')
  async loginVk(@Body() body: {code: string}) {
    let authData;

    try {
      authData = await this.appService.getVkToken(body.code);
    } catch (err) {
      throw new UnprocessableEntityException("Wrong VK code");
    }

    return authData;
  }

  @Get('/check/:email')
  async checkEmail(@Param('email') email: string) {
    return this.appService.checkEmail(email);
  }

  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      const refreshToken = req.headers.cookie.split('=')[1];
      const token = await this.appService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (error) {
      return res.json(error.response)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    try {
      if (!req.headers.cookie) {
        throw new UnauthorizedException({ message: 'Not authorized' });
      }
      const refreshToken = req.headers.cookie.split('=')[1];
      const userData = await this.appService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      return res.json(error.response)
    }
  }

  @Post('/registration')
  async registration(@Body() dto: AuthDto) {
    return this.appService.registration(dto);
  }
}
