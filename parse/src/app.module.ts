import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([{
      name: 'DB_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://rabbitmq:5672`],
        // urls: [`amqp://localhost:5672`],
        queue: 'db_queue',
        queueOptions: {
          durable: true
        }
      }
    }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
