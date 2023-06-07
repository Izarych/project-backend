import { Controller} from '@nestjs/common';
import { AddRoleDto } from './dto/add-user-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { User } from "./users.model";

@Controller()
export class UsersController {

  constructor(private userService: UsersService) { }

  @MessagePattern('create.user')
  async create(@Payload() userDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @MessagePattern('create.admin')
  async createAdmin(@Payload() userDto: CreateUserDto): Promise<User> {
    return this.userService.createAdmin(userDto);
  }

  @MessagePattern('activate.user')
  async activateUser(@Payload() link: string): Promise<User> {
    return this.userService.activateUser(link);
  }

  @MessagePattern('get.all.users')
  async getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @MessagePattern('get.user.id')
  async getUserById(@Payload() id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @MessagePattern('get.user.email')
  async getUserByEmail(@Payload() email: string): Promise<User> {
    return this.userService.getUserByEmail(email);
  }

  @MessagePattern('get.user.link')
  async getUserByLink(@Payload() link: string): Promise<User> {
    return this.userService.getUserByLink(link);
  }

  @MessagePattern('add.role')
  async addRole(@Payload() dto: AddRoleDto): Promise<AddRoleDto> {
    return this.userService.addRole(dto);
  }

  @MessagePattern('remove.role')
  async removeRole(@Payload() dto: AddRoleDto): Promise<AddRoleDto> {
    return this.userService.removeRole(dto);
  }

  @EventPattern('update.user')
  async update(@Payload() data: Partial<User>): Promise<User>  {
    return this.userService.updateUser(data);
  }

  @EventPattern('delete.user')
  async delete(@Payload() id: number): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
