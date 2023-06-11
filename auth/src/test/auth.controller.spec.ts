import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from "../app.controller";
import { AppService } from "../app.service";
import { JwtModule } from "@nestjs/jwt";
import { HttpModule } from "@nestjs/axios";
import { Response, Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';


describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;

    const authDto = {
        email: 'test@example.com',
        password: 'testPassword',
    };

    const userObject = {
        accessToken: 'testAccessToken',
        refreshToken: 'testRefreshToken',
        user: {
            id: 1,
            email: 'test@example.com',
            password: 'testHashedPassword',
            isActivated: false,
            roles: []
        }
    };

    const user = {
        id: 22,
        email: "test@mail.ru",
        password: "password",
        phoneNumber: null,
        isActivated: false,
        activationLink: "testlink",
        roles: null
    }

    const link = "testlink";

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                {
                    provide: AppService,
                    useValue: {
                        registration: jest.fn().mockResolvedValue({}),
                        login: jest.fn().mockResolvedValue({}),
                        reSendActivationLink: jest.fn().mockResolvedValue({}),
                        activate: jest.fn().mockResolvedValue({}),
                        loginGmail: jest.fn().mockResolvedValue({}),
                        getVkToken: jest.fn().mockResolvedValue({}),
                        checkEmail: jest.fn().mockResolvedValue({}),
                        refresh: jest.fn().mockResolvedValue({}),
                        logout: jest.fn().mockResolvedValue({}),
                        hashNewPassword: jest.fn().mockResolvedValue({}),
                        code: jest.fn().mockResolvedValue({})
                    },
                },
            ],
            imports: [
                HttpModule,
                JwtModule.register({
                    signOptions: {
                        expiresIn: '24h'
                    }
                }),
            ]
        }).compile();

        appController = moduleRef.get<AppController>(AppController);
        appService = moduleRef.get<AppService>(AppService);
    });

    describe('Check created test module', () => {
        it('should be defined', () => {
            expect(appController).toBeDefined();
        });
    });

    describe('registration', () => {
        describe('when registration called', () => {

            let response;
            let mockResponse: any = {
                json: jest.fn().mockImplementation((result) => {
                    return result;
                }),
                status: jest.fn(),
                cookie: jest.fn()
            };

            beforeEach(async () => {
                jest.spyOn(appService, 'registration').mockResolvedValue(userObject);
                response = await appController.registration(authDto, mockResponse as Response);
            });

            it('should call app service with dto', async () => {
                expect(appService.registration).toHaveBeenCalledWith(authDto);
            });

            it('should return created user object', async () => {
                expect(response).toEqual(userObject);
            });
        });
    });

    describe('login', () => {
        describe('when login called', () => {
            let response;
            let mockResponse: any = {
                json: jest.fn().mockImplementation((result) => {
                    return result;
                }),
                status: jest.fn(),
                cookie: jest.fn()
            };

            beforeEach(async () => {
                jest.spyOn(appService, 'login').mockResolvedValue(userObject);
                response = await appController.login(authDto, mockResponse as Response);
            });

            it('should call app service with dto', async () => {
                expect(appService.login).toHaveBeenCalledWith(authDto);
            });

            it('should return user object', async () => {
                expect(response).toEqual(userObject);
            });
        });
    });

    describe('resendLink', () => {
        describe('when resendLink called', () => {
            let response;
            let mockResponse: any = {
                json: jest.fn().mockImplementation((result) => {
                    return result;
                }),
                status: jest.fn(),
                cookie: jest.fn()
            };
            beforeEach(async () => {
                jest.spyOn(appService, 'reSendActivationLink').mockResolvedValue(user);
                response = await appController.resendLink(authDto.email, mockResponse as Response);
            });

            it('should call app service with email', async () => {
                expect(appService.reSendActivationLink).toHaveBeenCalledWith(authDto.email);
            });
            it('should return result of resend', async () => {
                expect(response).toEqual(user);
            });
        });
    });

    describe('activate', () => {
        describe('when activate called', () => {
            let response;
            let mockResponse: any = {
                json: jest.fn().mockImplementation((result) => {
                    return result;
                }),
                status: jest.fn(),
                cookie: jest.fn()
            };
            beforeEach(async () => {
                jest.spyOn(appService, 'activate').mockResolvedValue(user);
                response = await appController.activate(link,mockResponse as Response);
            });

            it('should call app service with link', async () => {
                expect(appService.activate).toHaveBeenCalledWith(link);
            });

            it('should return result of activate', async () => {
                expect(response).toEqual(user);
            });
        });
    });

    describe('googleAuthRedirect', () => {
        describe('when googleAuthRedirect called', () => {
            let response;
            const user = "test";
            const mockRequest: any = {
                user: "test"
            }
            beforeEach(async () => {
                jest.spyOn(appService, 'loginGmail').mockResolvedValue(user);
                response = await appController.googleAuthRedirect(mockRequest);
            });

            it('should call app service with request', async () => {
                expect(appService.loginGmail).toHaveBeenCalledWith(mockRequest);
            });

            it('should return user', async () => {
                expect(response).toEqual(user);
            });
        });
    });

    describe('/login_vk_success', () => {
        describe('when /login_vk called', () => {
            let response;
            const code = "any";
            let mockResponse: any = {
                json: jest.fn().mockImplementation((result) => {
                    return result;
                }),
            };

            beforeEach(async () => {
                jest.spyOn(appController, 'vkAuthRedirect').mockResolvedValue(mockResponse);
                response = await appController.vkAuthRedirect(code, mockResponse as Response);
            });

            it('should call app service with body', async () => {
                expect(appController.vkAuthRedirect).toHaveBeenCalledWith(code, mockResponse);
            });
        });
    });


    describe('/login_vk', () => {
        describe('when /login_vk called', () => {
            let response;
            let mockResponse: any = {
                redirect: jest.fn().mockImplementation((result) => {
                    return result;
                })
            };

            beforeEach(async () => {
                jest.spyOn(appController, 'vkAuth').mockResolvedValue();
                response = await appController.vkAuth(mockResponse as Response);
            });

            it('should call app service with body', async () => {
                expect(appController.vkAuth).toHaveBeenCalled();
            });

            it('should return undefind', async () => {
                expect(response).toBeUndefined();
            })
        });
    });



    describe('/login/vk', () => {
        describe('when /login/vk called', () => {
            let response;
            const body = {
                code: ""
            }
            const data = "any";

            beforeEach(async () => {

                jest.spyOn(appService, 'getVkToken').mockResolvedValue(data);
                response = await appController.loginVk(body);
            });

            it('should call app service with body', async () => {
                expect(appService.getVkToken).toHaveBeenCalledWith(body.code);
            });

            it('should return data', async () => {
                expect(response).toEqual(data)
            })
        });
    });

    describe('/check/:email', () => {
        describe('when /check/:email called', () => {
            let response;
            beforeEach(async () => {
                jest.spyOn(appService, 'checkEmail').mockResolvedValue(user);
                response = await appController.checkEmail(authDto.email);
            });

            it('should call app service with body', async () => {
                expect(appService.checkEmail).toHaveBeenCalledWith(authDto.email);
            });

            it('should return user', async () => {
                expect(response).toBe(user);
            });
        });
    });

    describe('/logout', () => {
        describe('when /logout called', () => {
            let response;
            let mockResponse: any = {
                json: jest.fn().mockImplementation((result) => {
                    return result;
                }),
                status: jest.fn(function (any){
                    return this
                }),
                cookie: jest.fn(),
                clearCookie: jest.fn(),
                send: jest.fn()
            };
            const mockRequest: any = {
                headers: {
                    cookie: "refresh=lkjdfaw"
                }
            };
            beforeEach(async () => {
                jest.spyOn(appService, 'logout').mockResolvedValue();
                jest.clearAllMocks()
            });

            it('should call app service', async () => {

                response = await appController.logout(mockRequest as Request, mockResponse as Response);
                expect(appService.logout).toHaveBeenCalled();
            });

            it('should return undefined', async () => {
                response = await appController.logout(mockRequest as Request, mockResponse as Response);
                expect(response).toBeUndefined();
            });

            it('should not call app cuz of invalid request', async () => {
                const mockRequest2: any = {};
                response = await appController.logout(mockRequest2 as Request, mockResponse as Response);
                expect(appService.logout).not.toHaveBeenCalled();
            })
        });
    });

    describe('/refresh', () => {
        describe('when /refresh called', () => {
            let response;
            let mockResponse: any = {
                json: jest.fn().mockImplementation((result) => {
                    return result;
                }),
                status: jest.fn(function (any){
                    return this
                }),
                cookie: jest.fn(),
                clearCookie: jest.fn(),
            };
            const mockRequest: any = {
                headers: {
                    cookie: "any"
                }
            };
            beforeEach(async () => {
                jest.spyOn(appService, 'refresh').mockResolvedValue(userObject);
                jest.clearAllMocks()
            });

            it('should call app service with body', async () => {
                response = await appController.refresh(mockRequest as Request, mockResponse as Response);
                expect(appService.refresh).toHaveBeenCalled();
            });

            it('should return userObject', async () => {
                response = await appController.refresh(mockRequest as Request, mockResponse as Response);
                expect(response).toEqual(userObject);
            });

            it('should not call app cuz of invalid request', async () => {
                const mockRequest2: any = {};
                response = await appController.refresh(mockRequest2 as Request, mockResponse as Response);
                expect(appService.refresh).not.toHaveBeenCalled();
            })
        });
    });


    describe('hashPassword', () => {
        describe('when hashPassword called', () => {
            let response;
            let password = "dawjsk";
            let hashedPassword = "TestHashedPassword"
            beforeEach(async () => {
                jest.spyOn(appService, 'hashNewPassword').mockResolvedValue(hashedPassword);
                jest.clearAllMocks()
            });

            it('should call app service with body', async () => {
                response = await appController.hashPassword(password);
                expect(appService.hashNewPassword).toHaveBeenCalledWith(password);
            });

            it('should return hashed password', async () => {
                response = await appController.hashPassword(password);
                expect(response).toEqual(hashedPassword);
            });
        });
    });

});