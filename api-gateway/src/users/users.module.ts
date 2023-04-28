import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';



@Module({
  controllers: [UsersController],
  providers: [],

  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://rabbitmq:5672`],
          //urls: [`amqp://localhost:5672`],
          queue: 'user_queue',
          queueOptions: {
            durable: true,
          },
        }
      }
    ])
  ],

  exports: []
})
export class UsersModule {}
