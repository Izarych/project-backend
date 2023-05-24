import { AppService } from "../app.service";
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from "@nestjs/axios";
import { JwtModule } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";
import { getModelToken } from "@nestjs/sequelize";
import { Token } from "../token/token.model";
import { of } from "rxjs";
import * as bcrypt from 'bcryptjs';
import { ConfigModule } from "@nestjs/config";

describe('AppService', () => {
    let appService: AppService;
    let response;

    const authDtoWrongEmail = {
        email: 'test@example.com',
        password: 'testPassword',
    };

    const authDtoWrongPass = {
        email: 'email1@mail.ru',
        password: 'testPassword',
    };

    const authDtoCorrect = {
        email: 'email1@mail.ru',
        password: 'password1',
    };

    const userRepository = [
        {
            id: 1,
            email: "email1@mail.ru",
            password: "password1",
            phoneNumber: "123456789",
            isActivated: false,
            activationLink: "testlink1"
        },
        {
            id: 2,
            email: "email2@mail.ru",
            password: "password2",
            phoneNumber: "123456788",
            isActivated: false,
            activationLink: "testlink2"
        }
    ];

    const mockUserService = {
        send: jest.fn().mockImplementation((command, value) => {
            switch (command) {
                case 'get.user.email':
                    return of(userRepository.find(user => user.email === value));
                case 'get.user.link':
                    return of(userRepository.find(user => user.activationLink === value));
                default:
                    break;
            }
        }),
    }

    const mockTokenRepository = {
        destroy: jest.fn((value) => {
            const tokenFind = tokens.find(token => token.refreshToken === value.where.refreshToken);
            if (tokenFind) {
                tokens.splice(tokens.indexOf(tokenFind), 1);
            };
        }),
        findOne: jest.fn().mockImplementation(),
        create: jest.fn()

    }

    const tokens = [
        {
            id: 1,
            userId: 1,
            refreshToken: "testtoken1"
        },
        {
            id: 2,
            userId: 2,
            refreshToken: "testtoken2"
        }
    ]

    const mockMailerService = {

    }

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                AppService,
                {
                    provide: 'AUTH_SERVICE',
                    useValue: mockUserService
                },

                {
                    provide: getModelToken(Token),
                    useValue: mockTokenRepository
                },

                {
                    provide: MailerService,
                    useValue: mockMailerService
                }
            ],
            imports: [
                HttpModule,
                JwtModule.register({
                    secret: 'test',
                    signOptions: {
                        expiresIn: '24h'
                    }
                })
            ]
        }).compile();
        appService = moduleRef.get<AppService>(AppService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('Check created test module', () => {
        it('should be defined', () => {
            expect(appService).toBeDefined();
        });
    });

    describe('Check email', () => {
        describe('when check email called', () => {
            let chechEmailSpyOn;
            beforeEach(async () => {
                jest.clearAllMocks();
                chechEmailSpyOn = jest.spyOn(appService, 'checkEmail');
            });

            it('should call app service with email', async () => {
                response = await appService.checkEmail(authDtoCorrect.email);
                expect(chechEmailSpyOn).toBeCalledWith(authDtoCorrect.email);
            });

            it('should return user if user in data base', async () => {
                response = await appService.checkEmail(authDtoCorrect.email);
                expect(response).toEqual(userRepository[0]);
            });

            it('should return undefinded', async () => {
                response = await appService.checkEmail(authDtoWrongEmail.email);
                expect(response).toBeUndefined();
            });
        });
    });

    describe('Check link', () => {
        describe('when check link called', () => {
            let chechLinkSpyOn;
            const rightLink = "testlink2";
            const wrongLink = "any";
            beforeEach(async () => {
                jest.clearAllMocks();
                chechLinkSpyOn = jest.spyOn(appService, 'checkLink');
            });

            it('should call app service with link', async () => {
                response = await appService.checkLink(rightLink);
                expect(chechLinkSpyOn).toBeCalledWith(rightLink);
            });

            it('should return user if user in data base', async () => {
                response = await appService.checkLink(rightLink);
                expect(response).toEqual(userRepository[1]);
            });

            it('should return undefinded', async () => {
                response = await appService.checkLink(wrongLink);
                expect(response).toBeUndefined();
            });
        });
    });

    describe('Login', () => {
        describe('when login called', () => {
            let loginSpyOn;
            let checkEmailSpyOn;

            beforeEach(async () => {
                jest.clearAllMocks();
                loginSpyOn = jest.spyOn(appService, 'login');
                checkEmailSpyOn = jest.spyOn(appService, 'checkEmail')
            });

            it('should call app service with dto and create token', async () => {
                const hashPassword = await bcrypt.hash(userRepository[0].password, 5);
                userRepository[0].password = hashPassword;
                response = await appService.login(authDtoCorrect);
                expect(checkEmailSpyOn).toBeCalledWith(authDtoCorrect.email);
                expect(loginSpyOn).toBeCalledWith(authDtoCorrect);
                expect(response).toEqual(tokens[0]);
            });

            it('should throw "User does not exist" exception', async () => {
                await expect(appService.login(authDtoWrongEmail)).rejects.toThrow('User does not exist');
            });

            it('should throw "Invalid password" exception', async () => {
                await expect(appService.login(authDtoWrongPass)).rejects.toThrow('Invalid password');
            });
        });
    });


    describe('Logout', () => {
        describe('when logout called', () => {
            let logoutSpyOn;
            const rightRefreshToken = tokens[0].refreshToken;
            const wrongRefreshToken = "any";

            beforeEach(async () => {
                jest.clearAllMocks();
                logoutSpyOn = jest.spyOn(appService, 'logout');
            });

            it('should call app service with refresh token', async () => {
                response = await appService.logout(rightRefreshToken);
                expect(logoutSpyOn).toBeCalledWith(rightRefreshToken);
            });

            it('should delete token', async () => {
                response = await appService.logout(rightRefreshToken);
                expect(tokens.find(token => token.refreshToken === rightRefreshToken)).toBeUndefined();
            });

            it('should not delete token', async () => {
                const tokensCount = tokens.length;
                response = await appService.logout(wrongRefreshToken);
                expect(logoutSpyOn).toBeCalledWith(wrongRefreshToken);
                expect(tokens.length).toBe(tokensCount);
            });

        });
    });






});






/*            let response;

beforeEach(async () => {
    jest.spyOn(appService, 'registration').mockResolvedValue(userObject);
    response = await appController.registration(authDto);
});

it('should call app service with dto', async () => {
    expect(appService.registration).toHaveBeenCalledWith(authDto);
});

it('should return created user object', async () => {
    expect(response).toEqual(userObject);
});*/