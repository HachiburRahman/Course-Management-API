import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // 1. Import ValidationPipe
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 2. Enable Global Validation Pipe with the required settings
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes fields not defined in the DTO
      forbidNonWhitelisted: true, // Throws an error if unknown fields are sent
      transform: true, // Automatically transforms payloads to match DTO types
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
