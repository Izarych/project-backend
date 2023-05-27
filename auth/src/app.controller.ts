import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AuthDto } from './dto/auth.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventPattern, Payload } from "@nestjs/microservices";

@ApiTags('Authorization')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly httpService: HttpService) { }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: "Log in",
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
        accesstoken: { type: 'string', example: 'someaccesstoken' },
        refreshtoken: { type: 'string', example: 'somerefreshtoken' },
        email: { type: 'string', example: 'email@gmail.com' },
        password: { type: 'string', example: 'hashpassword' }
      }
    }
  })
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
  @ApiParam({
    name: 'email',
    description: 'Email for sending mail',
    type: String,
    example: "test@mail.ru"
  })
  @ApiResponse({
    status: 200,
    description: "Resend mail on email, update link in table"
  })
  @Get('/sendlink/:email')
  async resendLink(@Param('email') email: string) {
    return this.appService.reSendActivationLink(email);
  }


  @ApiOperation({ summary: 'Activate account' })
  @ApiParam({
    name: 'link',
    description: 'Activation link',
    type: String,
    example: "anylinkhere"
  })
  @ApiResponse({
    status: 200,
    description: "Activate account if link is right"
  })
  @Get('/activate/:link')
  async activate(@Param('link') link: string) {
    return this.appService.activate(link);
  }


  @ApiOperation({ summary: 'Login by gmail' })
  @ApiOkResponse({ description: 'Successful gmail login' })
  @Get('login_gmail')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }


  @ApiOperation({ summary: 'login_gmail_success' })
  @ApiOkResponse({ description: 'Successful gmail login redirect' })
  @Get('login_gmail_success')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.appService.loginGmail(req)
  }

  @ApiOperation({ summary: 'login_vk' })
  @ApiResponse({
    status: 200,
    description: 'VK token was returned',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'somevktoken' }
      }
    }
  })
  @Get('/login_vk')
  async vkAuth(@Res() res: Response) {
    return res.redirect(`https://oauth.vk.com/authorize?` +
      `client_id=${process.env.VK_CLIENT_ID}&` +
      `display=page&` +
      `redirect_uri=${process.env.REDIRECT_URI_VK}&` +
      //`redirect_uri=${process.env.APP_LOCAL}/login_vk_success&` +
      `scope=offline&` +
      `response_type=code&` +
      `v=5.92`);
  }


  @ApiOperation({ summary: 'login_vk_success' })
  @ApiQuery({
    name: 'code',
    description: 'Code for VK login',
    type: String,
    example: 'somecodehere'
  })
  @ApiOkResponse({
    description: 'Successful vk login redirect'
  })
  @Get('/login_vk_success')
  async vkAuthRedirect(@Query('code') code: string, @Res() res: Response) {
    const resLoginVk = await firstValueFrom(this.httpService
      .post(
        `${process.env.APP_LOCAL}/login/vk`, { code }
      ))
    return res.json(resLoginVk.data)
  }


  @ApiOperation({ summary: '/login/vk' })
  @ApiBody({
    description: 'Code for VK login',
    schema: {
      type: 'object',
      properties: {
        code: { type: 'string', example: 'somecodehere' }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'VK token was returned',
    schema: {
      type: 'string',
      example: 'somevktoken'
    }
  })
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
  @ApiResponse({
    status: 200,
    description: 'User was returned if exists',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'email@gmail.com' },
        password: { type: 'string', example: 'hashpassword' }
      }
    }
  })
  @Get('/check/:email')
  async checkEmail(@Param('email') email: string) {
    return this.appService.checkEmail(email);
  }


  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({
    status: 200,
    description: "Удаление refresh токена из куков и удаление записи в таблице токенов"
  })
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
  @ApiResponse({
    status: 200,
    description: "Обновление resfresh и access токенов",
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
        accesstoken: { type: 'string', example: 'someaccesstoken' },
        refreshtoken: { type: 'string', example: 'somerefreshtoken' },
        email: { type: 'string', example: 'email@gmail.com' },
        password: { type: 'string', example: 'hashpassword' }
      }
    }
  })
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
  @ApiBody({
    description: 'В body отправляем email и пароль',
    type: AuthDto
  })
  @ApiResponse({
    status: 201,
    description: 'User registration',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
        accesstoken: { type: 'string', example: 'someaccesstoken' },
        refreshtoken: { type: 'string', example: 'somerefreshtoken' },
        email: { type: 'string', example: 'email@gmail.com' },
        password: { type: 'string', example: 'hashpassword' }
      }
    }
  })
  @Post('/registration')
  async registration(@Body() dto: AuthDto, @Res() res: Response) {
    try {
      const userData = await this.appService.registration(dto);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      return res.json(error.response)
    }
  }

  @ApiOperation({ summary: 'Регистрация админа' })
  @ApiBody({
    description: 'В body отправляем email и пароль',
    type: AuthDto
  })
  @ApiResponse({
    status: 201,
    description: 'Admin registration',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
        accesstoken: { type: 'string', example: 'someaccesstoken' },
        refreshtoken: { type: 'string', example: 'somerefreshtoken' },
        email: { type: 'string', example: 'email@gmail.com' },
        password: { type: 'string', example: 'hashpassword' }
      }
    }
  })
  @Post('/registrationAdmin')
  async registrationAdmin(@Body() dto: AuthDto) {
    return this.appService.registrationAdmin(dto);
  }

  @EventPattern('hash_password')
  async hashPassword(@Payload() password: string) {
    return this.appService.hashNewPassword(password);
  }
}
