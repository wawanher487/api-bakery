import { APP_GUARD, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './common/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // app.useGlobalGuards(new AuthGuard(new JwtService()));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(1200);
}
bootstrap();
