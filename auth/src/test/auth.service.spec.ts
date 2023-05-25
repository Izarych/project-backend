import { AppService } from "../app.service";
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from "@nestjs/axios";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";
import { getModelToken } from "@nestjs/sequelize";
import { Token } from "../token/token.model";
import { of } from "rxjs";
import * as bcrypt from 'bcryptjs';
import { BadRequestException, NotFoundException } from "@nestjs/common";

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
                case 'create.user':
                    const user = {
                        id: 3,
                        email: value.email,
                        password: value.password,
                        phoneNumber: null,
                        isActivated: false,
                        activationLink: value.activationLink
                    }
                    userRepository.push(user);
                    return of(user);

                case 'activate.user':
                    let result = userRepository.find(user => user.activationLink === value);

                    if (!result) {
                        throw new BadRequestException('Invalid link');
                    }
                    const index = userRepository.indexOf(result);
                    userRepository[index].isActivated = true;
                    return of(userRepository[index]);

                case 'update.user':
                    let requestedUser = userRepository.find(user => user.email === value.email);

                    if (!requestedUser) {
                        throw new NotFoundException('User doesnt exist');
                    }

                    userRepository[userRepository.indexOf(requestedUser)].activationLink = value.link
                    return of(requestedUser);
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
        findOne: jest.fn(),
        create: jest.fn()

    }


    const payload = { userId: 1, email: "email1@mail.ru", isActivated: false };

    const accessTokenMocked = ([
        new JwtService().sign({
            ...payload
        },
            {
                secret: "anystringhere",
                expiresIn: '24h'
            }
        )
    ]).toString();

    const refreshTokenMocked = ([
        new JwtService().sign({
            ...payload
        },
            {
                secret: "anyanotherstringhere",
                expiresIn: '24h'
            }
        )
    ]).toString();

    const testToken = {
        accessToken: accessTokenMocked,
        refreshToken: refreshTokenMocked,
        user: {
            email: "email1@mail.ru",
            id: 1,
            isActivated: false
        }
    };

    const tokens = [
        {
            id: 1,
            userId: 1,
            refreshToken: testToken.refreshToken
        },
        {
            id: 2,
            userId: 2,
            refreshToken: "testtoken2"
        }
    ];

    const mockMailerService = {
        sendMail: jest.fn().mockImplementation((value) => {
            return Promise.all([])
        })
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
                    secret: 'anyanotherstringhere',
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
                testToken.accessToken = response.accessToken;
                testToken.refreshToken = response.refreshToken;

                expect(checkEmailSpyOn).toBeCalledWith(authDtoCorrect.email);
                expect(loginSpyOn).toBeCalledWith(authDtoCorrect);
                expect(response).toEqual(testToken);
            });

            it('should throw "User does not exist" exception', async () => {
                await expect(appService.login(authDtoWrongEmail)).rejects.toThrow('User does not exist');
            });

            it('should throw "Invalid password" exception', async () => {
                await expect(appService.login(authDtoWrongPass)).rejects.toThrow('Invalid password');
            });
        });
    });

    describe('Refresh', () => {
        const mockfindOne = filter => {
            const tokenFromDb = tokens.find((token) =>
                token.refreshToken === filter.where.refreshToken
            );
            return Promise.resolve(tokenFromDb);
        };

        describe('when refresh called', () => {
            let refreshSpyOn;
            const rightRefreshToken = testToken.refreshToken;
            const wrongRefreshToken = "any";
            beforeEach(async () => {
                jest.clearAllMocks();
                refreshSpyOn = jest.spyOn(appService, 'refresh');
            });

            it('should call app service with token and refresh tokens in db', async () => {
                const findOneSpyOn = jest.spyOn(mockTokenRepository, 'findOne').mockImplementationOnce(mockfindOne);
                response = await appService.refresh(rightRefreshToken);
                testToken.accessToken = response.accessToken;
                testToken.refreshToken = response.refreshToken;

                expect(findOneSpyOn).toBeCalled();
                expect(refreshSpyOn).toBeCalledWith(rightRefreshToken);
                expect(response).toEqual(testToken);
            });

            it('should throw "No auth" exception cuz of invalid user token', async () => {
                await expect(appService.refresh(wrongRefreshToken)).rejects.toThrow('No auth');
            });

            it('should throw "No auth" exception cuz of havent token in db', async () => {
                await expect(appService.refresh(rightRefreshToken)).rejects.toThrow('No auth');
            });
        });
    });


    describe('Registration', () => {
        describe('when registration called', () => {
            let registrationSpyOn;
            let checkEmailSpyOn;

            beforeEach(async () => {
                jest.clearAllMocks();
                registrationSpyOn = jest.spyOn(appService, 'registration');
                checkEmailSpyOn = jest.spyOn(appService, 'checkEmail')
            });

            it('should throw "User with such email exists" exception', async () => {
                await expect(appService.registration(authDtoCorrect)).rejects.toThrow('User with such email exists');
            });

            it('should call app service with dto and create new user', async () => {
                const userRepositoryLength = userRepository.length;
                response = await appService.registration(authDtoWrongEmail);

                expect(checkEmailSpyOn).toBeCalledWith(authDtoWrongEmail.email);
                expect(registrationSpyOn).toBeCalledWith(authDtoWrongEmail);
                expect(userRepository.length).toBe(userRepositoryLength + 1);

            });
        });
    });

    describe('hashNewPassword', () => {
        describe('when hashNewPassword called', () => {
            let hashNewPasswordSpyOn;
            const testPassword = "any";
            beforeEach(async () => {
                jest.clearAllMocks();
                hashNewPasswordSpyOn = jest.spyOn(appService, 'hashNewPassword');
                response = await appService.hashNewPassword(testPassword);
            });

            it('should call app service with password', async () => {
                expect(hashNewPasswordSpyOn).toBeCalledWith(testPassword);
            });

            it('should return new password', async () => {
                expect(response).toBe<string>
            });
        });
    });


    describe('activate', () => {
        describe('when activate called', () => {
            let activateSpyOn;
            const rightLink = "testlink1";
            const wrongLink = "any";
            beforeEach(async () => {
                jest.clearAllMocks();
                activateSpyOn = jest.spyOn(appService, 'activate');
            });

            it('should call app service with link', async () => {
                response = await appService.activate(rightLink);
                expect(activateSpyOn).toBeCalledWith(rightLink);
            });

            it('should set isActivated true if link right', async () => {
                response = await appService.activate(rightLink);
                expect(response).toHaveProperty('isActivated', true);
                expect(userRepository[0]).toHaveProperty('isActivated', true);
            });

            it('should throw "Invalid link" exception', async () => {
                await expect(appService.activate(wrongLink)).rejects.toThrow('Invalid link');
            });

        });
    });

    describe('sendActivationLink', () => {
        describe('when sendActivationLink called', () => {
            let sendActivationLinkSpyOn;
            const link = "testlink1";
            const to = "test@mail.ru";
            beforeEach(async () => {
                jest.clearAllMocks();
                sendActivationLinkSpyOn = jest.spyOn(appService, 'sendActivationLink');
                response = await appService.sendActivationLink(to, link);
            });

            it('should call app service with link', async () => {
                expect(sendActivationLinkSpyOn).toBeCalledWith(to, link);
            });

            it('should return undefined', async () => {
                expect(response).toBeUndefined();
            });
        });
    });


    describe('reSendActivationLink', () => {
        describe('when reSendActivationLink called', () => {
            let sendActivationLinkSpyOn;
            const wrongEmail = "any@mail.ru";
            beforeEach(async () => {
                jest.clearAllMocks();
                sendActivationLinkSpyOn = jest.spyOn(appService, 'reSendActivationLink');
            });

            it('should call app service with link', async () => {
                response = await appService.reSendActivationLink(authDtoCorrect.email);
                expect(sendActivationLinkSpyOn).toBeCalledWith(authDtoCorrect.email);
            });

            it('should return user', async () => {
                response = await appService.reSendActivationLink(authDtoCorrect.email);
                expect(response).toEqual(userRepository[0]);
            });

            it('should throw "Invalid link" exception', async () => {
                await expect(appService.reSendActivationLink(wrongEmail)).rejects.toThrow('User doesnt exist');
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