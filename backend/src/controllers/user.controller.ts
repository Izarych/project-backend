import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Roles } from "guard/roles-auth.decorator";
import { RolesGuard } from "guard/roles.guard";
import { firstValueFrom, Observable } from "rxjs";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { IUser } from "src/interfaces/IUser";

@ApiTags('Gateway App. Users')
@Controller('user')
export class UserController {
    constructor(@Inject('USER_SERVICE') private userService: ClientProxy,
        @Inject('AUTH_SERVICE') private authService: ClientProxy) { }


    @ApiOperation({ summary: 'Получение всех пользователей' })
    @ApiResponse({
        status: 200,
        description: 'Получаем всех пользователей',
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'number', example: 1 },
                email: { type: 'string', example: 'mail@gmail.com' },
                password: { type: 'string', example: 'hashpassword' },
            }
        }
    })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    async getAllUsers(): Promise<Observable<IUser[]>> {
        return this.userService.send('get.all.users', '');
    }

    @ApiOperation({ summary: 'Получаем пользователя по id' })
    @ApiParam({
        name: 'id',
        description: 'id пользователя',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем пользователя по id',
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'number', example: 1 },
                email: { type: 'string', example: 'mail@gmail.com' },
                password: { type: 'string', example: 'hashpassword' },
            }
        }
    })
    @Get('/:id')
    async getOneByIdUser<T>(@Param('id') id: number, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
        const response = await firstValueFrom(this.userService.send('get.user.id', id));
        return await this.checkIfErrorCameBackAndSendResponse(response, res);
    }

    @ApiOperation({ summary: 'Добавление роли пользователю по id пользователя и value роли' })
    @ApiParam({
        name: 'id',
        description: 'id пользователя',
        type: Number,
        example: 1
    })
    @ApiParam({
        name: 'value',
        description: 'Значение роли',
        type: String,
        example: 'ADMIN'
    })
    @ApiResponse({
        status: 201,
        description: 'Пользователю добавляется роль',
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'number', example: 1 },
                email: { type: 'string', example: 'mail@gmail.com' },
                password: { type: 'string', example: 'hashpassword' },
                roles: {
                    properties: {
                        roleId: { type: 'number', example: 1 },
                        value: { type: 'string', example: 'USER' },
                        description: { type: 'string', example: 'Пользователь' }
                    }
                }
            }
        }
    })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/addrole/:id/:value')
    async addRole<T>(@Param('id') userId: number, @Param('value') roleValue: string, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
        const response = await firstValueFrom(this.userService.send('add.role', { userId, value: roleValue }));
        return await this.checkIfErrorCameBackAndSendResponse(response, res);
    }

    @ApiOperation({ summary: 'Удаление роли у пользователя' })
    @ApiParam({
        name: 'value',
        description: 'Значение роли',
        type: String,
        example: 'ADMIN'
    })
    @ApiResponse({
        status: 200,
        description: 'В ответе получаем пользователя у которого удалена роль',
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'number', example: 1 },
                email: { type: 'string', example: 'mail@gmail.com' },
                password: { type: 'string', example: 'hashpassword' },
                roles: {
                    example: []
                }
            }
        }
    })
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/removerole/:id/:value')
    async removeRole<T>(@Param('id') id: number, @Param('value') roleValue: string, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
        const response = await firstValueFrom(this.userService.send('remove.role', { userId: id, value: roleValue }));
        return await this.checkIfErrorCameBackAndSendResponse(response, res);
    }

    @ApiOperation({ summary: 'Обновление пользователя' })
    @ApiBody({
        description: 'В body отправляем любые значения которые хотим обновить',
        type: UpdateUserDto
    })
    @ApiResponse({
        status: 200,
        description: 'Получаем обновленного пользователя по id',
        type: UpdateUserDto
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/:id')
    async updateUser<T>(@Param('id') id: number, @Body() dto: UpdateUserDto, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
        let response = null;
        if (dto.password) {
            const hashPassword = await firstValueFrom(this.authService.send('hash_password', dto.password));
            response = await firstValueFrom(this.userService.send('update.user', { ...dto, id: id, password: hashPassword }));
        } else {
            response = await firstValueFrom(this.userService.send('update.user', { ...dto, id: id }));
        }

        return await this.checkIfErrorCameBackAndSendResponse(response, res);
    }

    @ApiOperation({ summary: 'Удаление пользователя' })
    @ApiParam({
        name: 'id',
        description: 'id пользователя',
        type: Number,
        example: 1
    })
    @ApiResponse({
        status: 200,
        description: 'Пользователь удаляется'
    })
    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async deleteUser<T>(@Param('id') id: number, @Res() res: Response): Promise<Response<T, Record<string, T>>> {
        const response = await firstValueFrom(this.userService.send('delete.user', id));
        return await this.checkIfErrorCameBackAndSendResponse(response, res);
    }

    private async checkIfErrorCameBackAndSendResponse(response: any, res: Response) {
        if (response.status) {
            return res.status(response.status).json(response);
        }
        return res.json(response);
    }
}