import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const PORT = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const host = configService.get('RABBITMQ_HOST');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${host}:5672`],
      // urls: [`amqp://localhost:5672`],
      queue: 'db_queue',
      queueOptions: {
        durable: true
      }
    }
  })
  await app.startAllMicroservices();
  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
}
bootstrap();
