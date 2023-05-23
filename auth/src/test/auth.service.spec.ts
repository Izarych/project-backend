import { AppService } from "../app.service";
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from "@nestjs/axios";
import { JwtModule } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";
import { getModelToken } from "@nestjs/sequelize";
import { Token } from "../token/token.model";
import { Observable, of } from "rxjs";

describe('AppService', () => {
    let appService: AppService;

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
        send: jest.fn()
            .mockImplementation((command, userEmail) => {

                switch (command) {
                    case 'get.user.email':
                        return of(userRepository.find(user => user.email === userEmail));
                    default:
                        break;
                }
            }),
    }

    const mockTokenRepository = {

    }

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
                    signOptions: {
                        expiresIn: '24h'
                    }
                }),
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
            beforeEach(async () => {
                jest.clearAllMocks();
            });

            it('should call app service with dto', async () => {
                const test = jest.spyOn(appService, 'checkEmail');
                await appService.checkEmail(authDtoCorrect.email);
                expect(test).toBeCalledWith(authDtoCorrect.email);
            });

            it('should return user if user in data base', async () => {
                jest.spyOn(appService, 'checkEmail');
                const response = await appService.checkEmail(authDtoCorrect.email);
                expect(response).toEqual(userRepository[0]);
            });

            it('should return undefinded', async () => {
                jest.spyOn(appService, 'checkEmail');
                const response = await appService.checkEmail(authDtoWrongEmail.email);
                expect(response).toBeUndefined();
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

        });
    });


})