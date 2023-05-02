import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 5002;
  await app.listen(PORT, () => { console.log(`Auth service listening on ${PORT}...`) });
}
bootstrap();