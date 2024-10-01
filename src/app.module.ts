import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/product/product.module';
import { ResellersModule } from './modules/resellers/resellers.module';
import { StocksModule } from './modules/stocks/stocks.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ShipmentsModule } from './modules/shipments/shipments.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './config/database.config';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),

   ProductModule, ResellersModule, StocksModule, OrdersModule, PaymentsModule, ShipmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
