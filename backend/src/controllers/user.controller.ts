import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Roles } from "guard/roles-auth.decorator";
import { RolesGuard } from "guard/roles.guard";
import { firstValueFrom } from "rxjs";
import { AddRoleDto } from "src/dto/add-user-role.dto";
import { UpdateUserDto } from "src/dto/update-user.dto";

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
    async getAllUsers() {
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
    async getOneByIdUser(@Param('id') id: number, @Res() res: Response) {
        const response = await firstValueFrom(this.userService.send('get.user.id', id));
        if (response.status) {
            return res.status(response.status).json(response);
        }
        return res.json(response);
    }

    @ApiOperation({ summary: 'Добавление роли пользователю по его id' })
    @ApiParam({
        name: 'id',
        description: 'id пользователя',
        type: Number,
        example: 1
    })
    @ApiBody({
        description: 'Отправляем в body роль которую нужно добавить',
        type: AddRoleDto
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
    @Post('/addrole/:id')
    async addRole(@Param('id') userId: number, @Body() dto: AddRoleDto, @Res() res: Response) {
        const response = await firstValueFrom(this.userService.send('add.role', { userId, value: dto.value }));
        if (response.status) {
            return res.status(response.status).json(response);
        }
        return res.json(response);
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
    async removeRole(@Param('id') id: number, @Param('value') roleValue: string, @Res() res: Response) {
        const response = await firstValueFrom(this.userService.send('remove.role', { userId: id, value: roleValue }));
        if (response.status) {
            return res.status(response.status).json(response);
        }
        return res.json(response);
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
    async updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto, @Res() res: Response) {
        let response = null;
        if (dto.password) {
            const hashPassword = await firstValueFrom(this.authService.send('hash_password', dto.password));
            response = await firstValueFrom(this.userService.send('update.user', { ...dto, id: id, password: hashPassword }));
        }else{
            response = await firstValueFrom(this.userService.send('update.user', { ...dto, id: id }));
        }

        if (response.status) {
            return res.status(response.status).json(response);
        }

        return res.json(response);
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
    async deleteUser(@Param('id') id: number, @Res() res: Response) {
        const response = await firstValueFrom(this.userService.send('delete.user', id));
        if (response.status) {
            return res.status(response.status).json(response);
        }
        return res.json(response);
    }
}