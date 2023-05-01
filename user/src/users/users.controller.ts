import { Controller } from '@nestjs/common';
import { AddRoleDto } from './dto/add-user-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateUserPhoneDto } from './dto/update-user-phone.dto';

@Controller()
export class UsersController {

  constructor(private userService: UsersService) { }

  @MessagePattern('create.user')
  create(@Payload() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @MessagePattern('get.all.users')
  getAll() {
    return this.userService.getAllUsers();
  }

  @MessagePattern('get.user')
  getUserByEmail(@Payload() email: string) {
    return this.userService.getUserByEmail(email);
  }

  @MessagePattern('add.role')
  addRole(@Payload() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @MessagePattern('remove.role')
  removeRole(@Payload() dto: AddRoleDto) {
    return this.userService.removeRole(dto);
  }

  @EventPattern('update.user')
  update(@Payload() userDto: UpdateUserDto) {
    return this.userService.updateUser(userDto);
  }

  @EventPattern('update.user')
  updatePhone(@Payload() dto: UpdateUserPhoneDto) {
    return this.userService.updateUserPhone(dto);
  }

  @EventPattern('delete.user')
  delete(@Payload() id: number) {
    return this.userService.deleteUser(id);
  }



}
