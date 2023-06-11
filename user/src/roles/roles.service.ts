import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role) private roleRepository: typeof Role) {
  }

  async createRole(roleDto: CreateRoleDto): Promise<Role> {
      return await this.roleRepository.create(roleDto);
  }

  async getRoleByValue(value: string): Promise<Role> {
    return await this.roleRepository.findOne({ where: { value } });
  }
}