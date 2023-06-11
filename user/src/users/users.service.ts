import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddRoleDto } from './dto/add-user-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { Role } from "../roles/roles.model";
import { RolesService } from "../roles/roles.service";


@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService) {
  }

  async createUser(userDto: CreateUserDto): Promise<User | BadRequestException> {
    const role: Role = await this.roleService.getRoleByValue("USER");
    if (!role) {
      return new BadRequestException('Role "USER" doesnot exists')
    }
    const user: User = await this.userRepository.create(userDto);
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async createAdmin(userDto: CreateUserDto): Promise<User | BadRequestException> {
    const role: Role = await this.roleService.getRoleByValue("ADMIN");
    if (!role) {
      return new BadRequestException('Role "ADMIN" doesnot exists')
    }
    const user: User = await this.userRepository.create(userDto);
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async activateUser(link: string): Promise<User | BadRequestException> {
    const user: User = await this.userRepository.findOne({ where: { activationLink: link } });
    if (!user) {
      return new BadRequestException('Invalid link');
    }
    await user.update({ isActivated: true });
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll({
      include: [
        {
          model: Role,
          attributes: ['id', 'value', 'description'],
          through: { attributes: [] }
        }
      ]
    });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      include: [
        {
          model: Role,
          attributes: ['id', 'value', 'description'],
          through: { attributes: [] }
        }
      ]
    });
  }

  async getUserById(id: number): Promise<User | HttpException> {
    const user: User = await this.userRepository.findByPk(id);
    if (!user) {
      return new HttpException('User doesnt exist', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async addRole(dto: AddRoleDto): Promise<AddRoleDto | HttpException> {
    try {
      return await this.addOrRemoveRole(dto, 'add');
    } catch (error) {
      return new HttpException(error.response, error.status, { cause: error });
    }

  }

  async deleteUser(id: number): Promise<{ message: string } | HttpException> {
    try {
      const user: User | HttpException = await this.getUserById(id);

      if (user instanceof HttpException) {
        throw new HttpException(user.getResponse(), user.getStatus());
      }

      await this.userRepository.destroy({ where: { id } });
      return {
        message: 'Пользователь был удален'
      }
    } catch (error) {

      return new HttpException(error.response, error.status, { cause: error });
    }

  }

  async updateUser(data: Partial<User>): Promise<User | NotFoundException> {
    let user: User;
    if (data.id) {
      user = await this.userRepository.findByPk(data.id);
    } else if (data.email) {
      user = await this.userRepository.findOne({ where: { email: data.email } });
    }

    if (!user) {
      return new NotFoundException('User doesnt exist');
    }
    await user.update(data);
    return user;
  }

  async removeRole(dto: AddRoleDto): Promise<AddRoleDto | HttpException> {
    try {
      return await this.addOrRemoveRole(dto, 'remove');
    } catch (error) {
      return new HttpException(error.response, error.status, { cause: error });
    }
  }

  async getUserByLink(link: string): Promise<User | HttpException> {
    const user: User = await this.userRepository.findOne({ where: { activationLink: link } });
    if (!user) {
      return new HttpException('User doesnt exist', HttpStatus.NOT_FOUND);
    }
    return user;
  }


  private async addOrRemoveRole(dto: AddRoleDto, operation: string): Promise<AddRoleDto> {
    const user: User = await this.userRepository.findByPk(dto.userId);
    const role: Role = await this.roleService.getRoleByValue(dto.value);

    if (dto.value == 'USER') {
      throw new HttpException('Role "USER" is disabled for using', HttpStatus.BAD_REQUEST);
    }

    if (!role) {
      throw new HttpException(`Role "${dto.value}" not found`, HttpStatus.NOT_FOUND);
    }

    if (!user) {
      throw new HttpException('User doesnt exist', HttpStatus.NOT_FOUND);
    }

    switch (operation) {
      case "add":
        await user.$add('roles', role.id);
        return dto;
      case "remove":
        await user.$remove('roles', role.id);
        return dto;
      default:
        break;
    }
  }
}

