import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ── Global validation pipe ───────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // strip unknown properties
      forbidNonWhitelisted: false,
      transform: true,       // auto-transform payloads to DTO class instances
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ── CORS ─────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ── Global route prefix ──────────────────────────────────────────────────
  app.setGlobalPrefix('api');

  // ── Swagger documentation ────────────────────────────────────────────────
  const config = new DocumentBuilder()
    .setTitle('Civil Work Monitor API')
    .setDescription(
      'Backend API for the Civil Work Monitor Flutter application.\n\n' +
      '## Authentication\n' +
      'Most endpoints require a Bearer JWT token in the `Authorization` header.\n\n' +
      '## OTP Flow\n' +
      '1. `POST /api/auth/send-otp` → sends OTP to phone\n' +
      '2. `POST /api/auth/verify-otp` → verifies OTP, returns JWT\n',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Civil Work Monitor API running on: http://localhost:${port}/api`);
  console.log(`📖 Swagger docs available at: http://localhost:${port}/api/docs`);
}

bootstrap();
