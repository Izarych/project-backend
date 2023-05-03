import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AddRoleDto } from "./dto/add-user-role.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateUserPhoneDto } from "./dto/update-user-phone.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller()
export class AppController {
    constructor(@Inject('USER_SERVICE') private userService: ClientProxy,
                @Inject('PARSE_SERVICE') private parseService: ClientProxy) { }

    @Post('/role')
    create(@Body() dto: CreateRoleDto) {
        return this.userService.send('create.role', dto);
    }

    @Get('/parse')
    async parseFilms() {
        return this.parseService.emit('parse', '');
    }

    @Get('/role/:role')
    getByValue(@Param('role') role: string) {
        return this.userService.send('get.role.by.value', role);
    }

    @Get('/user')
    getAll() {
        return this.userService.send('get.all.users', '');
    }

    @Get('/user/:id')
    getOneById(@Param('id') id: number) {
        return this.userService.send('get.user.id', id);
    }

    @Post('/user/addrole')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.send('add.role', dto);
    }

    @Delete('/user/removerole')
    removeRole(@Body() dto: AddRoleDto) {
        return this.userService.send('remove.role', dto);
    }

    @Put('/user/password')
    updatePassword(@Body() dto: UpdateUserDto) {
        return this.userService.send('update.user', dto);
    }

    @Put('/user/phone')
    updatePhoneNumber(@Body() dto: UpdateUserPhoneDto) {
        return this.userService.send('update.user.phone', dto);
    }

    @Delete('/user/:id')
    delete(@Param('id') id: number) {
        return this.userService.send('delete.user', id);
    }
}
