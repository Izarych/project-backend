import { INestApplication, ValidationPipe } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { SequelizeModule } from "@nestjs/sequelize";
import { Token } from "../src/token/token.model";
import { ClientProxy, ClientsModule, MicroserviceOptions, Transport } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { AppModule } from "../src/app.module";
//npm test:e2e:dev -t 'should return any' 
describe('AuthController E2E Test', () => {
    let app: INestApplication;
    let sender: ClientProxy;
    let client: INestApplication;

    const fullCorrectAuthDto = {
        email: "user3@mail.ru",
        password: "user1"
    };

    const correctAuthDtoWrongEmail = {
        email: "anywrongemail2@mail.ru",
        password: "user1"
    };

    const correctAuthDtoWrongPass = {
        email: "user3@mail.ru",
        password: "user"
    };

    const wrongAuthDtoNotEmail = {
        email: "anything",
        password: "user"
    };

    const wrongAuthDtoShortPass = {
        email: "user3@mail.ru",
        password: "u"
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                SequelizeModule.forRoot({
                    dialect: 'postgres',
                    host: process.env.POSTGRES_HOST,
                    port: Number(process.env.POSTGRES_PORT),
                    username: process.env.POSTGRES_USER,
                    password: process.env.POSTGRES_PASSWORD,
                    database: 'tokenstest',
                    models: [Token],
                    autoLoadModels: true,
                    synchronize: true
                })
            ]
        }).compile();


        const moduleFixtureSender: TestingModule = await Test.createTestingModule({
            imports: [
                ClientsModule.register([{
                    name: 'TO_AUTH_SERVICE_TEST',
                    transport: Transport.RMQ,
                    options: {
                        urls: [`amqp://${process.env.RABBITMQ_HOST}:5672`],
                        queue: 'auth_queue',
                        queueOptions: {
                            durable: true
                        }
                    }
                }]),
            ]
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        app.connectMicroservice<MicroserviceOptions>({
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://${process.env.RABBITMQ_HOST}:5672`],
                queue: 'auth_queue',
                queueOptions: {
                    durable: true,
                },
            },
        });
        await app.startAllMicroservices();
        await app.init();
        sender = moduleFixtureSender.get<ClientProxy>('TO_AUTH_SERVICE_TEST');
        await sender.connect();


    });

    afterAll(async () => {
        await app.close();
        await sender.close();
    })

    describe('GET /check/:email', () => {
        const urlPathWithRightEmail = "/check/user3@mail.ru";
        const urlPathWithWrongEmail = "/check/anywrongemail3@mail.ru";

        it('should return any user cuz user exists', async () => {
            const response = {
                id: 1,
                email: 'user3@mail.ru',
                password: '$2a$05$KoBv6ad6GoZuZ4iuYmR17OpWrDkrZmEK7qa5rjsLEws0Vg9AO/pyu',
                phoneNumber: null,
                isActivated: true,
                activationLink: '72d40fc4-6474-484a-a57d-2f44f186fcd1',
                createdAt: '2023-06-09T05:23:18.876Z',
                updatedAt: '2023-06-09T05:58:39.472Z',
                roles: [
                    { id: 1, value: 'USER', description: 'user1' },
                    { id: 2, value: 'Admin', description: 'Admin' }
                ]
            };
            console.log(await (await request(app.getHttpServer()).get(urlPathWithRightEmail)).body);


            return request(app.getHttpServer()).get(urlPathWithRightEmail).expect(200).expect(response);
        });

        it('should return {} cuz user with such email does not exists', async () => {
            const response = {};
            return request(app.getHttpServer()).get(urlPathWithWrongEmail).expect(200).expect(response);
        })
    });

    describe('POST /login', () => {
        const urlPath = "/login";

        it('should return 201 and user with tokens', async () => {
            const response = {
                accessToken: '',
                refreshToken: '',
                user: {
                    id: 1,
                    email: 'user3@mail.ru',
                    isActivated: true,
                    roles: [
                        { id: 1, value: 'USER', description: 'user1' },
                        { id: 2, value: 'Admin', description: 'Admin' }
                    ]
                }
            };
            const responseFromServer = await request(app.getHttpServer()).post(urlPath).send(fullCorrectAuthDto);
            response.accessToken = responseFromServer.body.accessToken;
            response.refreshToken = responseFromServer.body.refreshToken;
            return request(app.getHttpServer()).post(urlPath).send(fullCorrectAuthDto).expect(201).expect(response)
        });

        it('should return 400 cuz user with such email does not exists', async () => {
            const response = {
                response: {
                    statusCode: 400,
                    message: 'User does not exist',
                    error: 'Bad Request'
                },
                status: 400,
                options: {},
                message: 'User does not exist',
                name: 'BadRequestException'
            };
            return request(app.getHttpServer()).post(urlPath).send(correctAuthDtoWrongEmail).expect(400).expect(response);
        });

        it('should return 400 cuz user with such email exists but password is wrong', async () => {
            const response = {
                response: {
                    statusCode: 400,
                    message: 'Invalid password',
                    error: 'Bad Request'
                },
                status: 400,
                options: {},
                message: 'Invalid password',
                name: 'BadRequestException'
            };
            return request(app.getHttpServer()).post(urlPath).send(correctAuthDtoWrongPass).expect(400).expect(response);
        });

        it('should return 400 cuz no email and no pass', async () => {
            const response = {
                statusCode: 400,
                message: [
                    'Invalid email',
                    'Email must be string',
                    'Password length must be between 4 and 16 symbols',
                    'Password must be string'
                ],
                error: 'Bad Request'
            };
            return request(app.getHttpServer()).post(urlPath).expect(400).expect(response);
        });

        it('should return 400 cuz not email', async () => {
            const response = { statusCode: 400, message: ['Invalid email'], error: 'Bad Request' };
            return request(app.getHttpServer()).post(urlPath).send(wrongAuthDtoNotEmail).expect(400).expect(response);
        });

        it('should return 400 cuz too short password', async () => {
            const response = {
                statusCode: 400,
                message: ['Password length must be between 4 and 16 symbols'],
                error: 'Bad Request'
            };
            return request(app.getHttpServer()).post(urlPath).send(wrongAuthDtoShortPass).expect(400).expect(response);
        });

    });
    describe('POST /logout', () => {
        const urlPath = "/logout";

        it('should return 401 cuz no auth headers', async () => {
            const response = { message: 'No auth 1' };
            return request(app.getHttpServer()).post(urlPath).expect(401).expect(response);
        });

        it('should return 401 cuz no bearer token', async () => {
            const response = { message: 'No auth 2' };
            return request(app.getHttpServer()).post(urlPath).set({
                authorization: `Bearer`
            }).expect(401).expect(response);
        });

        it('should return 401 cuz dead access token', async () => {
            const response = { statusCode: 401, message: 'Unauthorized' };
            return request(app.getHttpServer()).post(urlPath).set({
                authorization: `Bearer token`
            }).expect(401).expect(response);
        });

        it('should return 401 cuz no cookie', async () => {
            const response = { message: 'Not authorized' };
            const responseFromServer = await request(app.getHttpServer()).post('/login').send(fullCorrectAuthDto);
            return request(app.getHttpServer()).post(urlPath).set({
                authorization: `Bearer ${responseFromServer.body.accessToken}`,
            }).expect(401).expect(response);
        });

        it('should return 204 and response = {}', async () => {
            const response = {};
            const responseFromServer = await request(app.getHttpServer()).post('/login').send(fullCorrectAuthDto);
            return request(app.getHttpServer()).post(urlPath).set({
                authorization: `Bearer ${responseFromServer.body.accessToken}`,     //auth 1
                cookie: `refreshToken=${responseFromServer.body.refreshToken}`      //auth 2
            }).expect(204).expect(response);
        });
    });



    describe('GET /refresh', () => {
        const urlPath = "/refresh";

        it('should return 401 cuz no cookie', async () => {
            const response = { message: 'Not authorized' };
            return request(app.getHttpServer()).get(urlPath).expect(401).expect(response);
        });

        it('should return 401 cuz not authorized or wrong cookie', async () => {
            const response = { message: 'No auth' };
            return request(app.getHttpServer()).get(urlPath).set({
                cookie: `refreshToken=test`
            }).expect(401).expect(response);
        });

        it('should return 200 and user with tokens', async () => {
            const response = {
                accessToken: "",
                refreshToken: "",
                user: {
                    id: 1,
                    email: 'user3@mail.ru',
                    isActivated: true,
                    roles: [
                        { id: 1, value: 'USER', description: 'user1' },
                        { id: 2, value: 'Admin', description: 'Admin' }
                    ]
                }
            };

            const responseFromServer = await request(app.getHttpServer()).post('/login').send(fullCorrectAuthDto);
            response.accessToken = responseFromServer.body.accessToken;
            response.refreshToken = responseFromServer.body.refreshToken;
            return request(app.getHttpServer()).get(urlPath).set({
                cookie: `refreshToken=${responseFromServer.body.refreshToken}`
            }).expect(200).expect(response);
        });
    });


    describe('POST /registration', () => {
        const urlPath = "/registration";

        it('should return 400 cuz no data', async () => {
            const response = {
                statusCode: 400,
                message: [
                    'Invalid email',
                    'Email must be string',
                    'Password length must be between 4 and 16 symbols',
                    'Password must be string'
                ],
                error: 'Bad Request'
            };
            return request(app.getHttpServer()).post(urlPath).expect(400).expect(response);
        });

        it('should return 400 cuz not email', async () => {
            const response = { statusCode: 400, message: ['Invalid email'], error: 'Bad Request' };
            return request(app.getHttpServer()).post(urlPath).send(wrongAuthDtoNotEmail).expect(400).expect(response);
        });

        it('should return 400 cuz too short password', async () => {
            const response = {
                statusCode: 400,
                message: ['Password length must be between 4 and 16 symbols'],
                error: 'Bad Request'
            };
            return request(app.getHttpServer()).post(urlPath).send(wrongAuthDtoShortPass).expect(400).expect(response);
        });


        it('should return 400 cuz user with such email exists', async () => {
            const response = {
                response: {
                    statusCode: 400,
                    message: 'User with such email exists',
                    error: 'Bad Request'
                },
                status: 400,
                options: {},
                message: 'User with such email exists',
                name: 'BadRequestException'
            };
            return request(app.getHttpServer()).post(urlPath).send(fullCorrectAuthDto).expect(400).expect(response);
        });

        it('should return 201 and user', async () => {
            const randomEmail = `user${Math.floor(Math.random() * 10000000000)}@mail.ru`;
            const randomUser = {
                email: randomEmail,
                password: "user1"
            };
            return request(app.getHttpServer()).post(urlPath).send(randomUser).expect(201);
        });
    });

    describe('GET /activate/:link', () => {
        const email = 'anywrongemail@mail.ru';
        const urlPathWithRightLink = "/activate/55ae13f8-dda4-4539-a9e2-e557fe9389b7";
        const urlPathWithWrongLink = "/activate/anylink";

        it('should return 400 cuz invalid link', async () => {
            const response = {
                response: {
                    response: { statusCode: 400, message: 'Invalid link', error: 'Bad Request' },
                    status: 400,
                    options: {},
                    message: 'Invalid link',
                    name: 'BadRequestException'
                },
                status: 400,
                options: {},
                message: 'Invalid link',
                name: 'BadRequestException'
            };

            return request(app.getHttpServer()).get(urlPathWithWrongLink).expect(400).expect(response);
        });


        it('should return 200 and user', async () => {
            const response = {
                id: 3,
                email: 'anywrongemail@mail.ru',
                password: '$2a$05$AGbM9P30TANQMqDWZaLa0.UbSiKyQYJxIt7wrzWcYjohBXwl8mYMu',
                phoneNumber: null,
                isActivated: true,
                activationLink: '55ae13f8-dda4-4539-a9e2-e557fe9389b7',
                createdAt: '2023-06-10T08:51:11.649Z',
                updatedAt: '2023-06-10T09:27:01.993Z'
            };
            return request(app.getHttpServer()).get(urlPathWithRightLink).expect(200).expect(response);
        });
    });


    describe('GET /sendlink/:email', () => {
        const urlPathWithRightEmail = "/sendlink/user3@mail.ru";
        const urlPathWithWrongEmail = "/sendlink/anye@mail.ru";

        it('should return 400 cuz invalid email', async () => {
            const response = {
                response: {
                    response: {
                        statusCode: 404,
                        message: 'User doesnt exist',
                        error: 'Not Found'
                    },
                    status: 404,
                    options: {},
                    message: 'User doesnt exist',
                    name: 'NotFoundException'
                },
                status: 400,
                options: {},
                message: 'User doesnt exist',
                name: 'BadRequestException'
            };

            return request(app.getHttpServer()).get(urlPathWithWrongEmail).expect(400).expect(response);
        });


        it('should return 200 and user', async () => {
            const response = {
                id: 1,
                email: 'user3@mail.ru',
                password: '$2a$05$KoBv6ad6GoZuZ4iuYmR17OpWrDkrZmEK7qa5rjsLEws0Vg9AO/pyu',
                phoneNumber: null,
                isActivated: true,
                activationLink: '72d40fc4-6474-484a-a57d-2f44f186fcd1',
                createdAt: '2023-06-09T05:23:18.876Z',
                updatedAt: '2023-06-09T05:58:39.472Z'
            };
            return request(app.getHttpServer()).get(urlPathWithRightEmail).expect(200).expect(response);
        });
    });

    describe('GET /login_vk', () => {
        const urlPath = "/login_vk";

        it('should return 302 and {}', async () => {
            const response = {};

            return request(app.getHttpServer()).get(urlPath).expect(302).expect(response);
        });
    });

    describe('GET /login_vk_success', () => {
        const urlPath = "/login_vk_success?code=something";
        it('should return 500 cuz cant redirect to not started server ##TOFIX', async () => {
            const response = { statusCode: 500, message: 'Internal server error' };

            return request(app.getHttpServer()).get(urlPath).expect(500).expect(response);
        });
    });

    describe('POST /login/vk', () => {
        const urlPath = "/login/vk";
        const loginVkBody = { code: "any" };
        it('should return 422 cuz wrong vk token ???', async () => {
            const response = {
                statusCode: 422,
                message: 'Wrong VK code',
                error: 'Unprocessable Entity'
            };
            return request(app.getHttpServer()).post(urlPath).send(loginVkBody).expect(422).expect(response);
        });
    });


    describe('GET /login_gmail', () => {
        const urlPath = "/login_gmail";
        it('should return 302 and {} ???', async () => {
            const response = {};
            return request(app.getHttpServer()).get(urlPath).expect(302).expect(response);
        });
    });

    describe('GET /login_gmail_success', () => {
        const urlPath = "/login_gmail_success";
        it('should return 302 and {} ##TOFIX', async () => {
            const response = {};
            return request(app.getHttpServer()).get(urlPath).expect(302).expect(response);
        });
    });

    describe('@EventPattern("hash_password")', () => {
        it('should return hashed password', async () => {
            const password = "testpass";
            const request = await firstValueFrom(sender.send('hash_password', password));
            return expect(request).not.toEqual(password);
        });
    });

});