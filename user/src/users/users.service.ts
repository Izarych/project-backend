import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-user-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User,
              private roleService: RolesService) {
  }

  async createUser(userDto: CreateUserDto) {
    const user = await this.userRepository.create(userDto);
    let role = await this.roleService.getRoleByValue("USER");
    if (!role) {
      role = await this.roleService.createRole({value: "USER", description: "Пользователь"});
    }
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({include: {all: true}});
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (user && role) {
        await user.$add('roles', role.id);
        return dto;
    }
    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
  }

  async deleteUser(id: number) {
    await this.userRepository.destroy({where: {id}});
  }

  async updateUser(userDto: UpdateUserDto) {
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    await this.userRepository.update({...userDto, password: hashPassword}, {where: {id: userDto.id}});
  }

}
