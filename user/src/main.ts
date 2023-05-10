import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const host = configService.get('RABBITMQ_HOST');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${host}:5672`],
      queue: 'user_queue',
      queueOptions: {
        durable: true,
      },
    },
  });
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${host}:5672`],
      queue: 'from_auth_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices().then(() => { console.log(`User service listening...`) });
}
bootstrap();
