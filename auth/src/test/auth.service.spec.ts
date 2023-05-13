import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Token } from '../token/token.model';
import { AppService } from '../app.service';
import { BadRequestException } from '@nestjs/common';

describe('AppService', () => {
    
    let jwtService: JwtService;
    let httpService: HttpService;
    let tokenRepository: typeof Token;
    let userService: ClientProxy;
    let mailerService: MailerService;
    let appService: AppService = new AppService(jwtService, httpService, tokenRepository, userService, mailerService);
    //let appService: AppService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AppService,
            ],
            imports: [
                HttpModule,
                SequelizeModule.forFeature([Token]),
                JwtModule.register({
                    signOptions: {
                        expiresIn: '24h'
                    }
                }),
                ConfigModule.forRoot({
                    envFilePath: `.${process.env.NODE_ENV}.env`
                }),
                SequelizeModule.forRoot({
                    dialect: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'postgres',
                    password: '123',
                    database: 'tokens',
                    models: [Token],
                    autoLoadModels: true,
                    synchronize: true
                }),
                ClientsModule.register([{
                    name: 'AUTH_SERVICE',
                    transport: Transport.RMQ,
                    options: {
                        urls: [`amqp://localhost:5672`],
                        queue: 'from_auth_queue',
                        queueOptions: {
                            durable: true
                        }
                    }
                }]),
                MailerModule.forRoot({
                    transport: {
                        host: 'smtp.gmail.com',
                        port: 587,
                        secure: false,
                        auth: {
                            user: 'example.sender@gmail.com',
                            pass: 'unique special password',
                        },
                    },
                }),
            ]
        }).compile();

        appService = module.get<AppService>(AppService);
    });

    describe('reg', () => {

        it('should be defined', () => {
            expect(appService).toBeDefined();
        });


        // it('should return any', async () => {
        //     const dto = {
        //         email: 'test432@example.com',
        //         password: 'testPassword',
        //     }
        //     const user = await appService.registration(dto);
        //     console.log(user);

        // }, 600000);
    });

    describe('logout', () => {
        it('should return any', async () => {
            const token = "anytoken"
            const logoutSpy = jest.spyOn(appService, 'logout');
            const logout = await appService.logout(token);
            expect(logoutSpy).toHaveBeenCalledWith(token);
            expect(logoutSpy).toBeCalledTimes(1);
            expect(logoutSpy).toHaveReturned();

        });
    });
});