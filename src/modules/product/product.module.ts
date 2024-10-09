import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Stock } from '../stocks/entities/stock.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Stock]), AuthModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    JwtService,
    AuthGuard,
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class ProductModule {}
