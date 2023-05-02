import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AddRoleDto } from "./dto/add-user-role.dto";
import { CreateRoleDto } from "./dto/create-role.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserPhoneDto } from "./dto/update-user-phone.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller()
export class AppController {
    constructor(@Inject('USER_SERVICE') private userService: ClientProxy) { }

    @Post('/role')
    create(@Body() dto: CreateRoleDto) {
        return this.userService.send('create.role', dto);
    }

    @Get('/role/:role')
    getByValue(@Param('role') role: string) {
        return this.userService.send('get.role.by.value', role);
    }

    @Post('/user')
    createUser(@Body() dto: CreateUserDto) {
        return this.userService.send('create.user', dto);
    }

    @Get('/users/:email')
    getOneByEmail(@Param('email') email: string) {
       return this.userService.send('get.user.email', email);
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