import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      //urls: [`amqp://rabbitmq:5672`],
      urls: [`amqp://localhost:5672`],
      queue: 'comment_queue',
      queueOptions: {
        durable: true,
      },
    },
  });
  app.startAllMicroservices().then(() => { console.log(`Comment service listening...`) });
}
bootstrap();
