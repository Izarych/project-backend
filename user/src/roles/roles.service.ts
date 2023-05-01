import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role) private roleRepository: typeof Role) {
  }

  async createRole(roleDto: CreateRoleDto) {
    try {
      const role = await this.roleRepository.create(roleDto);
      return role;
    } catch (error) {
      return new HttpException('Role exists', HttpStatus.BAD_REQUEST);
    }
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    return role;
  }
}