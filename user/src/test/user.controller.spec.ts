import {Test, TestingModule} from '@nestjs/testing';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { RolesService } from '../roles/roles.service';
import {BadRequestException, HttpException, HttpStatus, NotFoundException} from "@nestjs/common";
import {AddRoleDto} from "../users/dto/add-user-role.dto";

describe('UserController', () => {
    let userController: UsersController;
    let userService: UsersService;
    let userModel;
    const addRoleDto : AddRoleDto = {
        userId: 1,
        value: 'ADMIN'
    }
    const createUserDto: CreateUserDto = {
        email: 'test@mail.ru',
        password: 'password123',
    };
    const mockUser = {
        id: 1,
        email: createUserDto.email,
        password: createUserDto.password,
        phoneNumber: null,
        isActivated: false,
        activationLink: null,
    };
    const mockUsers = [
        {
            id: 1,
            email: createUserDto.email,
            password: createUserDto.password,
            phoneNumber: null,
            isActivated: false,
            activationLink: 'testlink',
    },
        {
            id: 2,
            email: 'anotheruser@mail.ru',
            password: createUserDto.password,
            phoneNumber: null,
            isActivated: true,
            activationLink: 'testlink'
        }
    ]

    beforeEach(async () => {
        userModel = {
            create: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            findByPk: jest.fn()
        };
        const moduleRef : TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                {
                    provide: getModelToken(User),
                    useValue: userModel,
                },
                {
                    provide: RolesService,
                    useValue: {
                        getRoleByValue: jest.fn().mockReturnValue({
                            id: 2,
                            value: 'ADMIN',
                            description: 'Администратор',
                        }),
                    },
                },
            ],
        }).compile();

        userController = moduleRef.get<UsersController>(UsersController);
        userService = moduleRef.get<UsersService>(UsersService);
    });

    afterEach( () => {
        jest.clearAllMocks();
    })

    describe('create', () => {
        it('should create a user and return it', async () => {
            const user = {
                $set: jest.fn().mockReturnThis(),
                roles: jest.fn(),
            };
            const roles = [{ id: 2, value: 'ADMIN', description: 'Администратор' }];
            userModel.create.mockResolvedValue({ ...mockUser, ...user });
            const result : User = await userController.create(createUserDto);
            expect(userModel.create).toHaveBeenCalledWith(createUserDto);
            expect(user.$set).toHaveBeenCalledWith('roles', [roles[0].id]);
            expect(result).toEqual({ ...mockUser, ...user, roles: roles });
        });
    });

    describe('activate user', () => {
        it('should activate user with correct link', async () => {
            const link : string = 'testlink';
            const updatedUser = {...mockUser, isActivated: true};
            userModel.findOne.mockResolvedValue({...mockUser})
            jest.spyOn(userService, 'activateUser').mockResolvedValue(updatedUser as User);

            const result : User = await userController.activateUser(link);

            expect(userService.activateUser).toHaveBeenCalledWith(link);
            expect(result).toEqual(updatedUser);
        })

        it('should throw an error if link is incorrect', async () => {
            const link : string = 'invalid-link';
            jest.spyOn(userService, 'activateUser').mockRejectedValue(new BadRequestException('Invalid link'));

            await expect(userController.activateUser(link)).rejects.toThrow('Invalid link');
        })
    })

    describe('get all users', () => {
        it('should return all users', async () =>  {
            jest.spyOn(userService, 'getAllUsers').mockResolvedValue(mockUsers as User[]);

            const result : User[] = await userController.getAll();

            expect(result).toEqual(mockUsers);
            expect(userService.getAllUsers).toHaveBeenCalled();
        })
    })

    describe('get user by email', () => {
        it('should return user', async () => {
            const email : string = 'test@mail.ru';

            jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(mockUser as User);

            const result : User = await userController.getUserByEmail(email);

            expect(result).toEqual(mockUser);
            expect(userService.getUserByEmail).toHaveBeenCalledWith(email);
        })
    })

    describe('get user by id', () => {
        it('should return user', async () => {
            const id : number = 1;

            jest.spyOn(userService, 'getUserById').mockResolvedValue(mockUser as User);
            userModel.findByPk.mockResolvedValue({...mockUser});

            const result : User = await userController.getUserById(id);

            expect(result).toEqual(mockUser);
            expect(userService.getUserById).toHaveBeenCalledWith(id);
        })

        it('should throw an error if user doesn`t exist', async () => {
            const id : number = -1;

            jest.spyOn(userService, 'getUserById').mockRejectedValue(new HttpException('User doesnt exist', HttpStatus.NOT_FOUND));

            await expect(userController.getUserById(id)).rejects.toThrow('User doesnt exist');
        })
    })

    describe('get user by link', () => {
        it('should get user by his link', async () => {
            const link : string = 'testlink';

            jest.spyOn(userService, 'getUserByLink').mockResolvedValue(mockUser as User);
            userModel.findOne.mockResolvedValue({...mockUser});

            const result : User = await userController.getUserByLink(link);

            expect(result).toEqual(mockUser);
            expect(userService.getUserByLink).toHaveBeenCalledWith(link);
        })
        it('should throw an error if user doesn`t exist', async () => {
            const link : string = 'wronglink';

            jest.spyOn(userService, 'getUserByLink').mockRejectedValue(new HttpException('User doesnt exist', HttpStatus.NOT_FOUND));

            await expect(userController.getUserByLink(link)).rejects.toThrow('User doesnt exist');
        })
    })

    describe('add or remove user role', () => {
        it('should return role that was added to user', async () => {
            const user = {
                $add: jest.fn().mockReturnThis(),
                roles: jest.fn()
            };
            const roles = [{ id: 2, value: 'ADMIN', description: 'Администратор' }];
            userModel.findByPk.mockResolvedValue({ ...mockUser, ...user });
            const result : AddRoleDto = await userController.addRole(addRoleDto);
            expect(userModel.findByPk).toHaveBeenCalledWith(addRoleDto.userId);
            expect(user.$add).toHaveBeenCalledWith('roles', roles[0].id);
            expect(result).toEqual(addRoleDto);
        })

        it('should send role that was removed', async () => {
            const user = {
                $add: jest.fn().mockReturnThis(),
                $remove: jest.fn().mockReturnThis(),
                roles: jest.fn()
            };
            const roles = [{ id: 2, value: 'ADMIN', description: 'Администратор' }];
            userModel.findByPk.mockResolvedValue({ ...mockUser, ...user });
            const result : AddRoleDto = await userController.removeRole(addRoleDto);
            expect(userModel.findByPk).toHaveBeenCalledWith(addRoleDto.userId);
            expect(user.$remove).toHaveBeenCalledWith('roles', roles[0].id);
            expect(result).toEqual(addRoleDto);
        })

        it('should throw an error if added role is USER', async () => {
            const errAddRoleDto : AddRoleDto = {...addRoleDto, value: 'USER'};

            await expect(userController.addRole(errAddRoleDto)).rejects.toThrow('Role "USER" is disabled for using');
        })

        it('should throw an error if role not found', async () => {
            const wrongRoleDto : AddRoleDto = {...addRoleDto, value: 'WRONG'};

            jest.spyOn(userService, 'addRole').mockRejectedValue(
                new HttpException(
                `Role "${wrongRoleDto.value}" not found`,
                HttpStatus.NOT_FOUND)
            );
            await expect(userController.addRole(wrongRoleDto)).rejects.toThrow(`Role "${wrongRoleDto.value}" not found`);
        })

        it('should throw an error if user doesnt exist', async () => {
            userModel.findByPk.mockResolvedValue(null);

            await expect(userController.addRole(addRoleDto)).rejects.toThrow('User doesnt exist');

        })
    })

    describe('update user', () => {
        it ('should update user', async () => {
            const data: Partial<User> = {
                email: 'updatedmail@mail.ru',
                password: 'newpassword'
            }
            const updatedUser = {...mockUser};
            for (const key in data) {
                const value = data[key];
                if (updatedUser.hasOwnProperty(key)) {
                    updatedUser[key] = value;
                }
            }
            jest.spyOn(userService, 'updateUser').mockResolvedValue(updatedUser as User);

            const result : User = await userController.update(data);

            expect(result).toEqual(updatedUser);
            expect(userService.updateUser).toHaveBeenCalledWith(data);
        })
    })

});
