import {BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {AddRoleDto} from './dto/add-user-role.dto';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './users.model';
import {Role} from "../roles/roles.model";
import {RolesService} from "../roles/roles.service";


@Injectable()
export class UsersService {

  constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService) {
  }

  async createUser(userDto: CreateUserDto) : Promise<User> {
    const role : Role = await this.roleService.getRoleByValue("USER");
    const user : User = await this.userRepository.create(userDto);
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async createAdmin(userDto: CreateUserDto) : Promise<User> {
    const role : Role = await this.roleService.getRoleByValue("ADMIN");
    const user : User = await this.userRepository.create(userDto);
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async activateUser(link: string) : Promise<User> {
    const user : User = await this.userRepository.findOne({where: {activationLink: link}});
    if (!user) {
      throw new BadRequestException('Invalid link');
    }
    await user.update({ isActivated: true });
    return user;
  }

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string) : Promise<User> {
    return await this.userRepository.findOne({where: {email}, include: {all: true}});
  }

  async getUserById(id: number) : Promise<User> {
    const user : User = await this.userRepository.findByPk(id);
    if (!user) {
      throw new HttpException('User doesnt exist', HttpStatus.NOT_FOUND);
    }
    return user;

  }

  async addRole(dto: AddRoleDto) {
    return await this.addOrRemoveRole(dto, 'add');
  }

  async deleteUser(id: number) : Promise<{message: string}> {
    const user = await this.getUserById(id);
    await user.destroy();
    return {
      message: 'Пользователь был удален'
    };
  }

  async updateUser(data: Partial<User>) : Promise<User> {
    const user : User = await this.userRepository.findByPk(data.id);
    if (!user) {
      throw new NotFoundException('User doesnt exist');
    }
    await user.update(data);
    return user;
  }

  async removeRole(dto : AddRoleDto) {
    return await this.addOrRemoveRole(dto, 'remove');
  }

  async getUserByLink(link: string) : Promise<User> {
    const user : User = await this.userRepository.findOne({ where: { activationLink: link } });
    if (!user) {
      throw new HttpException('User doesnt exist', HttpStatus.NOT_FOUND);
    }
    return user;
  }


  private async addOrRemoveRole(dto: AddRoleDto, operation: string) {
    const user : User = await this.userRepository.findByPk(dto.userId);
    const role : Role = await this.roleService.getRoleByValue(dto.value);

    if (dto.value == 'USER') {
      throw new HttpException('Role "USER" is disabled for using', HttpStatus.BAD_REQUEST);
    }

    if (!role) {
      throw new HttpException(`Role "${role}" not found`, HttpStatus.NOT_FOUND);
    }

    if (!user) {
      throw new HttpException('User doesnt exist', HttpStatus.NOT_FOUND);
    }

    if (operation == 'add') {
      await user.$add('roles', role.id);
      return dto;
    } else if (operation == 'remove') {
      await user.$remove('roles', role.id);
      return dto;
    }
  }
}

