import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Token } from './token/token.model';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    SequelizeModule.forFeature([Token]),
    JwtModule.register({}),
    ConfigModule.forRoot({
      envFilePath: `.development.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [],
      autoLoadModels: true
    }),
    ClientsModule.register([{
      name: 'AUTH_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://rabbitmq:5672`],
        // urls: [`amqp://localhost:5672`],
        queue: 'from_auth_queue',
        queueOptions: {
          durable: true
        }
      }
    }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
