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
import { IUserWithTokens } from './interfaces/IUserWithTokens';
import { IUser } from './interfaces/IUser';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

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
  async login<T>(@Body() dto: AuthDto, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
    try {
      const userData: IUserWithTokens = await this.appService.login(dto);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      return res.status(error.status).json(error)
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
  async resendLink<T>(@Param('email') email: string, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
    try {
      return res.json(await this.appService.reSendActivationLink(email));
    } catch (error) {
      return res.status(error.status).json(error)
    }

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
  async activate<T>(@Param('link') link: string, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
    try {
      return res.json(await this.appService.activate(link));
    } catch (error) {
      return res.status(error.status).json(error)
    }
  }


  @ApiOperation({ summary: 'Login by gmail' })
  @ApiOkResponse({ description: 'Successful gmail login' })
  @Get('login_gmail')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req): Promise<void> { }


  @ApiOperation({ summary: 'login_gmail_success' })
  @ApiOkResponse({ description: 'Successful gmail login redirect' })
  @Get('login_gmail_success')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req): any {
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
  async vkAuth(@Res() res: Response): Promise<void> {
    return res.redirect(`https://oauth.vk.com/authorize?` +
      `client_id=${process.env.VK_CLIENT_ID}&` +
      `display=page&` +
      `redirect_uri=${process.env.REDIRECT_URI_VK}&` +
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
  async vkAuthRedirect<T>(@Query('code') code: string, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
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
  async loginVk<T>(@Body() body: { code: string }): Promise<T> {
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
  async checkEmail(@Param('email') email: string): Promise<IUser> {
    return await this.appService.checkEmail(email);
  }


  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({
    status: 200,
    description: "Удаление refresh токена из куков и удаление записи в таблице токенов"
  })
  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout<T>(@Req() req: Request, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
    try {
      if (!req.headers.cookie) {
        throw new UnauthorizedException({ message: 'Not authorized' });
      }
      const refreshToken: string = req.headers.cookie.split('=')[1];
      await this.appService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.status(204).send();  //ЗАГЛУШКА
    } catch (error) {
      return res.status(error.status).json(error.response)
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
  async refresh<T>(@Req() req: Request, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
    try {
      if (!req.headers.cookie) {
        throw new UnauthorizedException({ message: 'Not authorized' });
      }
      const refreshToken: string = req.headers.cookie.split('=')[1];
      const userData: IUserWithTokens = await this.appService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      return res.status(error.status).json(error.response)
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
  async registration<T>(@Body() dto: AuthDto, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
    try {
      const userData: IUserWithTokens = await this.appService.registration(dto);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (error) {
      return res.status(error.status).json(error)
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
  async registrationAdmin(@Body() dto: AuthDto): Promise<IUserWithTokens> {
    return await this.appService.registrationAdmin(dto);
  }

  @EventPattern('hash_password')
  async hashPassword(@Payload() password: string): Promise<string> {
    return await this.appService.hashNewPassword(password);
  }
}
