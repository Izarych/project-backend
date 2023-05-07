import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AddRoleDto } from "./dto/add-user-role.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateUserPhoneDto } from "./dto/update-user-phone.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {RolesGuard} from "../guard/roles.guard";
import {Roles} from "../guard/roles-auth.decorator";
import {JwtAuthGuard} from "../guard/jwt-auth.guard";

@Controller()
export class AppController {
    constructor(@Inject('USER_SERVICE') private userService: ClientProxy,
                @Inject('PARSE_SERVICE') private parseService: ClientProxy) { }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    create(@Body() dto: CreateRoleDto) {
        return this.userService.send('create.role', dto);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/parse')
    async parseFilms() {
        return this.parseService.emit('parse', '');
    }

    @Get('/role/:role')
    getByValue(@Param('role') role: string) {
        return this.userService.send('get.role.by.value', role);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/user')
    getAll() {
        return this.userService.send('get.all.users', '');
    }

    @Get('/user/:id')
    getOneById(@Param('id') id: number) {
        return this.userService.send('get.user.id', id);
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/user/addrole/:id')
    addRole(@Param('id') userId: number, @Body() dto: AddRoleDto) {
        return this.userService.send('add.role', {userId, value: dto.value});
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/user/removerole')
    removeRole(@Body() dto: AddRoleDto) {
        return this.userService.send('remove.role', dto);
    }

    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/user/password')
    updatePassword(@Body() dto: UpdateUserDto) {
        return this.userService.send('update.user', dto);
    }

    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Put('/user/phone')
    updatePhoneNumber(@Body() dto: UpdateUserPhoneDto) {
        return this.userService.send('update.user.phone', dto);
    }

    @Roles('USER', 'ADMIN')
    @UseGuards(RolesGuard)
    @Delete('/user/:id')
    delete(@Param('id') id: number) {
        return this.userService.send('delete.user', id);
    }
}
