import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 5002;
  const config = new DocumentBuilder()
    .setTitle("RTR")
    .setDescription("Test Document")
    .setVersion("0.0.1")
    .addTag("RTR")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(PORT, () => { console.log(`Auth service listening on ${PORT}...`) });
}
bootstrap();