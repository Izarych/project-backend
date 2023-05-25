import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {INestApplication} from "@nestjs/common";

async function bootstrap() {
  const app : INestApplication = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  })
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 5002;
  const host = configService.get('RABBITMQ_HOST');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${host}:5672`],
      queue: 'auth_queue',
      queueOptions: {
        durable: true,
      },
    },
  });
  const config = new DocumentBuilder()
    .setTitle("Auth Documentation")
    .setDescription("Документация Auth сервиса")
    .setVersion("1.0.0")
    .addTag("backend")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.startAllMicroservices();
  await app.listen(PORT, () => { console.log(`Auth service listening on ${PORT}...`) });
}
bootstrap();