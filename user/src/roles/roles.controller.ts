import { Controller, HttpException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Role } from './roles.model';

@Controller()
export class RolesController {

  constructor(private roleService: RolesService) { }

  @MessagePattern('create.role')
  async create(@Payload() roleDto: CreateRoleDto): Promise<Role | HttpException> {
    return await this.roleService.createRole(roleDto);
  }

  @MessagePattern('get.role.by.value')
  async getByValue(@Payload() value: string): Promise<Role> {
    return await this.roleService.getRoleByValue(value);
  }
}
