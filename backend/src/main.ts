import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // To accept both ports (dev and prod)
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:5172',
      'http://localhost',
      process.env.FRONTEND_URL || 'http://localhost:4200',
    ],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Backend running on http://localhost:${process.env.PORT ?? 3000}`,
  );
}
bootstrap();
