import { BadRequestException, Controller, HttpException, NotFoundException } from '@nestjs/common';
import { AddRoleDto } from './dto/add-user-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { User } from "./users.model";

@Controller()
export class UsersController {

  constructor(private userService: UsersService) { }

  @MessagePattern('create.user')
  async create(@Payload() userDto: CreateUserDto): Promise<User | BadRequestException> {
    return await this.userService.createUser(userDto);
  }

  @MessagePattern('create.admin')
  async createAdmin(@Payload() userDto: CreateUserDto): Promise<User | BadRequestException> {
    return await this.userService.createAdmin(userDto);
  }

  @MessagePattern('activate.user')
  async activateUser(@Payload() link: string): Promise<User | BadRequestException> {
    return await this.userService.activateUser(link);
  }

  @MessagePattern('get.all.users')
  async getAll(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @MessagePattern('get.user.id')
  async getUserById(@Payload() id: number): Promise<User | HttpException> {
    return await this.userService.getUserById(id);
  }

  @MessagePattern('get.user.email')
  async getUserByEmail(@Payload() email: string): Promise<User> {
    return await this.userService.getUserByEmail(email);
  }

  @MessagePattern('get.user.link')
  async getUserByLink(@Payload() link: string): Promise<User | HttpException> {
    return await this.userService.getUserByLink(link);
  }

  @MessagePattern('add.role')
  async addRole(@Payload() dto: AddRoleDto): Promise<AddRoleDto | HttpException> {
    return await this.userService.addRole(dto);
  }

  @MessagePattern('remove.role')
  async removeRole(@Payload() dto: AddRoleDto): Promise<AddRoleDto | HttpException> {
    return await this.userService.removeRole(dto);
  }

  @EventPattern('update.user')
  async update(@Payload() data: Partial<User>): Promise<User | NotFoundException> {
    return await this.userService.updateUser(data);
  }

  @EventPattern('delete.user')
  async delete(@Payload() id: number): Promise<{ message: string } | HttpException> {
    return await this.userService.deleteUser(id);
  }
}
