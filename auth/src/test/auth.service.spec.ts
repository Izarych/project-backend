import { AppService } from "../app.service";
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from "@nestjs/axios";
import { JwtModule } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";
import { getModelToken } from "@nestjs/sequelize";
import { Token } from "../token/token.model";

describe('AppService', () => {
    let appService: AppService;
    const mockUserService = {

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
})