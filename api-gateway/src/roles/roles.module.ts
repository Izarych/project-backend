import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [],
  controllers: [RolesController],

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
export class RolesModule {}
