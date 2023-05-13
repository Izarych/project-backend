import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from "../app.controller";
import { AppService } from "../app.service";
import { JwtModule } from "@nestjs/jwt";
import { HttpModule } from "@nestjs/axios";
import { Response } from 'express';


describe('AppController', () => {
    let appController: AppController;
    let appService: AppService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                {
                    provide: AppService,
                    useValue: {
                        registration: jest.fn().mockResolvedValue({}),
                        checkEmail: jest.fn().mockResolvedValue({}),
                        login: jest.fn().mockResolvedValue({}),
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

    // describe('registration', () => {
    //     it('should return created user object', async () => {
    //         const authDto = {
    //             email: 'test@example.com',
    //             password: 'testPassword',
    //         };

    //         const userObject = {
    //             user: {
    //                 id: 1,
    //                 email: 'test@example.com',
    //                 password: 'testHashedPassword',
    //                 isActivated: false,
    //             },
    //             accessToken: 'testAccessToken',
    //             refreshToken: 'testRefreshToken',
    //         };
    //         jest.spyOn(appService, 'registration').mockResolvedValue(userObject);
    //         const response = await appController.registration(authDto);
    //         expect(response).toBe(userObject);
    //         expect(appService.registration).toHaveBeenCalledWith(authDto);
    //     });
    // });

    describe('registration', () => {
        it('should return created user object', async () => {
            const authDto = {
                email: 'test432@example.com',
                password: 'testPassword',
            };

            const userObject = {
                user: {
                    id: 1,
                    email: 'test@example.com',
                    password: 'testHashedPassword',
                    isActivated: false,
                },
                accessToken: 'testAccessToken',
                refreshToken: 'testRefreshToken',
            };
            jest.spyOn(appService, 'registration').mockResolvedValue(userObject);
            const response = await appController.registration(authDto);
            console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!response`);
            console.log(response);
            
            //expect(response).toBe(userObject);
            expect(appService.registration).toHaveBeenCalledWith(authDto);
        });
    });


    // describe('login', () => {
    //     it('should return user Object', async () => {
    //         const authDto = {
    //             email: 'test123@example.com',
    //             password: 'testPassword',
    //         };

    //         const userObject = {
    //             user: {
    //                 id: 1,
    //                 email: 'test@example.com',
    //                 password: 'testHashedPassword',
    //                 isActivated: false,
    //             },
    //             accessToken: 'testAccessToken',
    //             refreshToken: 'testRefreshToken',
    //         };

    //         jest.spyOn(appService, 'login').mockResolvedValue(userObject);
    //         const mockResponse: any = {
    //             json: jest.fn().mockImplementation((result) => {
    //                 return result;
    //             }),
    //             status: jest.fn(),
    //             cookie: jest.fn()
    //         };

    //         const response = await appController.login(authDto, mockResponse as Response);
    //         console.log(response);

    //         //expect(response).toBe(userObject);
    //         expect(response).toHaveProperty('user.email', 'test123@example.com')
    //         expect(appService.login).toHaveReturned();
    //         expect(appService.login).toHaveBeenCalledWith(authDto);
    //     });

    //     // it('should return nothing', async () => {
    //     //     const authDto = {
    //     //         email: 'test@example.com',
    //     //         password: 'testPassword',
    //     //     };

    //     //     const userObject = {
    //     //         user: {
    //     //             id: 1,
    //     //             email: 'test@example.com',
    //     //             password: 'testHashedPassword',
    //     //             isActivated: false,
    //     //         },
    //     //         accessToken: 'testAccessToken',
    //     //         refreshToken: 'testRefreshToken',
    //     //     };

    //     //     jest.spyOn(appService, 'login').mockResolvedValue(userObject);
    //     //     const mockResponse: any = {
    //     //         json: jest.fn().mockImplementation((result) => {
    //     //             return result;
    //     //         }),
    //     //         status: jest.fn(),
    //     //         cookie: jest.fn()
    //     //     };

    //     //     const response = await appController.login(authDto, mockResponse as Response);
    //     //     console.log(authDto);

    //     //     console.log(response);

    //     //     expect(response).toBe(userObject);
    //     //     expect(appService.login).toHaveBeenCalledWith(authDto);
    //     // });
    // });


});
