import { Module } from '@nestjs/common';
import { ParseController } from './parse.controller';
import { ParseService } from './parse.service';
import {ClientsModule, Transport} from "@nestjs/microservices";



@Module({
  controllers: [ParseController],
  providers: [ParseService],
  imports: [ClientsModule.register([{
    name: 'DB_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://rabbitmq:5672`],
      queue: 'db_queue',
      queueOptions: {
        durable: true
      }
    }
  }]),],
  exports: [
    ParseService,
  ]
})
export class ParseModule { }
