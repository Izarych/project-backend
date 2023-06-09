import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {ConfigService} from "@nestjs/config";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {INestApplication} from "@nestjs/common";

async function bootstrap() : Promise<void> {
  const PORT : string | 5001 = process.env.PORT || 5001;
  const app : INestApplication = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000'
  })
  const configService = app.get(ConfigService);
  const host = configService.get('RABBITMQ_HOST');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${host}:5672`],
      queue: 'db_queue',
      queueOptions: {
        durable: true
      }
    }
  })
  const config = new DocumentBuilder()
      .setTitle("Работа с БД")
      .setDescription("БД документация")
      .setVersion("1.0.0")
      .addTag("backend")
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.startAllMicroservices();
  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
}
bootstrap();
