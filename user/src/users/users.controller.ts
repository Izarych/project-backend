import { Controller } from '@nestjs/common';
import { AddRoleDto } from './dto/add-user-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {User} from "./users.model";

@Controller()
export class UsersController {

  constructor(private userService: UsersService) { }

  @MessagePattern('create.user')
  create(@Payload() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @MessagePattern('activate.user')
  activateUser(@Payload() link: string) {
    return this.userService.activateUser(link);
  }

  @MessagePattern('get.all.users')
  getAll() {
    return this.userService.getAllUsers();
  }

  @MessagePattern('get.user.id')
  getUserById(@Payload() id: number) {
    return this.userService.getUserById(id);
  }

  @MessagePattern('get.user.email')
  getUserByEmail(@Payload() email: string) {
    return this.userService.getUserByEmail(email);
  }

  @MessagePattern('get.user.link')
  getUserByLink(@Payload() link: string) {
    return this.userService.getUserByLink(link);
  }

  @MessagePattern('add.role')
  addRole(@Payload() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @MessagePattern('remove.role')
  removeRole(@Payload() dto : AddRoleDto) {
    return this.userService.removeRole(dto);
  }

  @EventPattern('update.user')
  update(@Payload() data: Partial<User>) : Promise<User> {
    return this.userService.updateUser(data);
  }
  
  @EventPattern('delete.user')
  delete(@Payload() id: number) {
    return this.userService.deleteUser(id);
  }



}
