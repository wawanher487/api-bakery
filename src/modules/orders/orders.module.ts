import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Reseller } from '../resellers/entities/reseller.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Reseller,Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
