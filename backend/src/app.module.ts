import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from './app.controller';
import {JwtModule} from "@nestjs/jwt";


@Module({
  controllers: [AppController],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ClientsModule.register([{
      name: 'PARSE_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RABBITMQ_HOST}:5672`],
        queue: 'parse_queue',
        queueOptions: {
          durable: true
        }
      }
    }]),
    ClientsModule.register([{
      name: 'USER_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RABBITMQ_HOST}:5672`],
        queue: 'user_queue',
        queueOptions: {
          durable: true
        }
      }
    }]),
    ClientsModule.register([{
      name: 'COMMENT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RABBITMQ_HOST}:5672`],
        queue: 'comment_queue',
        queueOptions: {
          durable: true
        }
      }
    }]),
    ClientsModule.register([{
      name: 'AUTH_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RABBITMQ_HOST}:5672`],
        queue: 'auth_queue',
        queueOptions: {
          durable: true
        }
      }
    }]),
    JwtModule.register({
      signOptions: {
        expiresIn: '24h'
      }
    })
  ]
})
export class AppModule { }
