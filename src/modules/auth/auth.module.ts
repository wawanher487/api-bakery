import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from './entities/refreshToken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken]), JwtModule],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
