import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from './app.controller';


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
        urls: [`amqp://rabbitmq:5672`],
        // urls: [`amqp://localhost:5672`],
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
        urls: [`amqp://rabbitmq:5672`],
        // urls: [`amqp://localhost:5672`],
        queue: 'user_queue',
        queueOptions: {
          durable: true
        }
      }
    }]),
  ]
})
export class AppModule { }
