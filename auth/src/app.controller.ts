import { Body, Controller, Get, Param, Post, Query, Req, Res, UnauthorizedException, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Token } from './token/token.model';

@ApiTags('Authorization')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly httpService: HttpService) { }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: Token })
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

  @ApiOperation({ summary: 'Resend activation link on email' })
  @ApiResponse({ status: 200})
  @Get('/sendlink/:email')
  async resendLink(@Param('email') email: string) {
    return this.appService.reSendActivationLink(email);
  }


  @ApiOperation({ summary: 'Activate account' })
  @ApiResponse({ status: 200})
  @Get('/activate/:link')
  async test(@Param('link') link: string) {
    return this.appService.activate(link);
  }


  @ApiOperation({ summary: 'Login by gmail' })  //Дописать надо
  @ApiResponse({ status: 200 })
  @Get('login_gmail')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }


  @ApiOperation({ summary: 'login_gmail_success' }) //Дописать надо
  @ApiResponse({ status: 200 })
  @Get('login_gmail_success')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.gmailLogin(req)
  }

  @ApiOperation({ summary: 'login_vk' })//Дописать надо
  @ApiResponse({ status: 200})
  @Get('/login_vk')
  async auth(@Res() res: Response) {
    const host =
      process.env.NODE_ENV === 'prod'
        ? process.env.APP_HOST
        : process.env.APP_LOCAL;

    return res.redirect(`https://oauth.vk.com/authorize?client_id=${process.env.VK_CLIENT_ID}&display=page&redirect_uri=${host}/login_vk_success&scope=offline&response_type=code&v=5.92`);
  }


  @ApiOperation({ summary: 'login_vk_success' }) //Дописать надо
  @ApiResponse({ status: 200 })
  @Get('/login_vk_success')
  async code(@Query('code') code: string, @Res() res: Response) {
    const host =
      process.env.NODE_ENV === 'prod'
        ? process.env.APP_HOST
        : process.env.APP_LOCAL;
    return res.json((await firstValueFrom(this.httpService.post(`${host}/login/vk`, { code }))).data)
  }


  @ApiOperation({ summary: '/login/vk' }) //Дописать надо
  @ApiResponse({ status: 200 })
  @Post('/login/vk')
  async loginVk(@Body() body: { code: string }) {
    let authData;

    try {
      authData = await this.appService.getVkToken(body.code);
    } catch (err) {
      throw new UnprocessableEntityException("Wrong VK code");
    }

    return authData;
  }


  @ApiOperation({ summary: 'Check if user email exists or not' })
  @ApiResponse({ status: 200})
  @Get('/check/:email')
  async checkEmail(@Param('email') email: string) {
    return this.appService.checkEmail(email);
  }


  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 200 })
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

  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiResponse({ status: 200, type: Token })
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


  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 200})
  @Post('/registration')
  async registration(@Body() dto: AuthDto) {
    return this.appService.registration(dto);
  }
}
