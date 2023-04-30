import { Body, Controller, Get, Inject, Param, Post, UsePipes } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('roles')
export class RolesController {

  constructor(
    @Inject('USER_SERVICE') private roleService: ClientProxy, 
  ) {}

  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.roleService.send('create.role', roleDto);
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.send('get.role.by.value', value);
  }

}
