import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://rabbitmq:5672`],
      //urls: [`amqp://localhost:5672`],
      queue: 'user_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  app.startAllMicroservices().then(() => { console.log(`User service listening...`) });
}
bootstrap();
