import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000'
  })
  const configService = app.get(ConfigService);
  const host = configService.get('RABBITMQ_HOST');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${host}:5672`],
      queue: 'comment_queue',
      queueOptions: {
        durable: true,
      },
    },
  });
  app.startAllMicroservices().then(() => { console.log(`Comment service listening...`) });
}
bootstrap();
