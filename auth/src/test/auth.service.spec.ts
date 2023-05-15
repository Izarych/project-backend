import { AppService } from "../app.service";
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from "@nestjs/axios";
import { JwtModule } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";
import { getModelToken } from "@nestjs/sequelize";
import { Token } from "../token/token.model";

describe('AppService', () => {
    let appService: AppService;

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
    ]
    const mockUserService = {
        //send: jest.fn().mockResolvedValue({}),
        //send: jest.fn().mockImplementation((user) => { return userRepository.includes(user) ? user : undefined}),
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

    describe('Check created test module', () => {
        it('should be defined', () => {
            expect(appService).toBeDefined();
        });
    });

    describe('Check email', () => {
        describe('when check email called', () => {


        });
    });


})