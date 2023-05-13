import { Test, TestingModule } from '@nestjs/testing';
import {AppController} from "../app.controller";
import {AppService} from "../app.service";
import {JwtModule} from "@nestjs/jwt";
import {HttpModule} from "@nestjs/axios";


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
        it('should return created user object', async () => {
            const authDto = {
                email: 'test@example.com',
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
            expect(response).toBe(userObject);
            expect(appService.registration).toHaveBeenCalledWith(authDto);
        });
    });
});