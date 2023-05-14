import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from "../app.controller";
import { AppService } from "../app.service";
import { JwtModule } from "@nestjs/jwt";
import { HttpModule } from "@nestjs/axios";
import { Response } from 'express';


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
        }
    };

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
                        gmailLogin: jest.fn().mockResolvedValue({}),
                        getVkToken: jest.fn().mockResolvedValue({}),
                        checkEmail: jest.fn().mockResolvedValue({}),
                        refresh: jest.fn().mockResolvedValue({}),
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

    describe('registration', () => {
        describe('when registration called', () => {

            let response;

            beforeEach(async () => {
                jest.spyOn(appService, 'registration').mockResolvedValue(userObject);
                response = await appController.registration(authDto);
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
            const result = [0];
            let response;
            beforeEach(async () => {
                jest.spyOn(appService, 'reSendActivationLink').mockResolvedValue(result);
                response = await appController.resendLink(authDto.email);
            });

            it('should call app service with email', async () => {
                expect(appService.reSendActivationLink).toHaveBeenCalledWith(authDto.email);
            });
            it('should return result of resend', async () => {
                expect(response).toEqual(result);
            });
        });
    });

    describe('activate', () => {
        describe('when activate called', () => {
            const result = [0];
            let response;
            beforeEach(async () => {
                jest.spyOn(appService, 'activate').mockResolvedValue(result);
                response = await appController.activate(link);
            });

            it('should call app service with link', async () => {
                expect(appService.activate).toHaveBeenCalledWith(link);
            });

            it('should return result of activate', async () => {
                expect(response).toEqual(result);
            });
        });
    });

    describe('googleAuthRedirect', () => {              //change
        describe('when googleAuthRedirect called', () => {
            const mockRequest: any = {
            }
            beforeEach(async () => {
                jest.spyOn(appService, 'gmailLogin').mockResolvedValue(mockRequest);
                await appController.googleAuthRedirect(mockRequest);
            });

            it('should call app service with request', async () => {
                expect(appService.gmailLogin).toHaveBeenCalledWith(mockRequest);
            });
        });
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ++++ login_vk_success

    // describe('login_vk', () => {                 
    //     describe('when login_vk called', () => {
    //         let response;
    //         let mockResponse: any = {
    //             redirect: jest.fn().mockImplementation((result) => {
    //                 return result;
    //             }),
    //         };
    //         beforeEach(async () => {
    //             response = await appController.auth(mockResponse);
    //         });

    //         it('should call app service with response', async () => {
    //             expect(response).toHaveBeenCalledWith(mockResponse);
    //         });
    //     });
    // });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    describe('/login/vk', () => {                       //change
        describe('when /login/vk called', () => {
            const body = {
                code: ""
            }
            beforeEach(async () => {
                jest.spyOn(appService, 'getVkToken').mockResolvedValue(body);
                await appController.loginVk(body);
            });

            it('should call app service with body', async () => {
                expect(appService.getVkToken).toHaveBeenCalledWith(body.code);
            });
        });
    });

    describe('/check/:email', () => {
        describe('when /check/:email called', () => {
            let response;
            beforeEach(async () => {
                jest.spyOn(appService, 'checkEmail').mockResolvedValue(userObject.user);
                response = await appController.checkEmail(authDto.email);
            });

            it('should call app service with body', async () => {
                expect(appService.checkEmail).toHaveBeenCalledWith(authDto.email);
            });

            it('should return user', async () => {
                expect(response).toBe(userObject.user);
            });
        });
    });

    // describe('/refresh', () => {
    //     describe('when /refresh called', () => {
    //         let response;
    //         beforeEach(async () => {
    //             jest.spyOn(appService, 'refresh').mockResolvedValue(userObject.user);
    //             response = await appController.refresh(authDto.email);
    //         });

    //         it('should call app service with body', async () => {
    //             expect(appService.refresh).toHaveBeenCalledWith(authDto.email);
    //         });

    //         it('should return user', async () => {
    //             expect(response).toBe(userObject.user);
    //         });
    //     });
    // });

});