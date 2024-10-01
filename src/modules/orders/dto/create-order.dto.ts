import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { status } from '../entities/order.entity';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  order_date: Date;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsString()
  order_status: status;
}
