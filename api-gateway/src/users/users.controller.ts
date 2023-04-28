import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { AddRoleDto } from './dto/add-user-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class UsersController {

  constructor(
    @Inject('USER_SERVICE') private userService: ClientProxy, 
  ) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.send('create.user', userDto);
  }

  @Get()
  getAll() {
    return this.userService.send('get.all.users', '');
  }

  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.send('add.role', dto);
  }

  @Put()
  update(@Body() userDto: UpdateUserDto) {
    return this.userService.emit('update.user', userDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.userService.emit('delete.user', id);
  }

}
