import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Stock } from '../stocks/entities/stock.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Stock]), AuthModule],
  controllers: [ProductController],
  providers: [ProductService, JwtService],
})
export class ProductModule {}
