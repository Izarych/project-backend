import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {INestApplication} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

async function bootstrap() : Promise<void> {
  const app : INestApplication = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const host = configService.get('RABBITMQ_HOST');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${host}:5672`],
      queue: 'parse_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices().then(() => { console.log('Parse service listening...') });
}
bootstrap();
