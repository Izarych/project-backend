import { Controller } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class RolesController {

  constructor(private roleService: RolesService) { }

  @MessagePattern('create.role')
  async create(@Payload() roleDto: CreateRoleDto) {
    return this.roleService.createRole(roleDto);
  }

  @MessagePattern('get.role.by.value')
  async getByValue(@Payload() value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
