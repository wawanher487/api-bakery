import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { WebResponse } from 'src/common/model/web.model';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('add')
  async create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<WebResponse<any>> {
    try {
      const data = await this.ordersService.create(createOrderDto);
      return {
        success: true,
        data: data,
        message: 'Order created successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('reseller/:reseller_id/product/:product_id')
  async createProductReseller(
    @Param('reseller_id') reseller_id: number,
    @Param('product_id') product_id: number,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<WebResponse<any>> {
    try {
      const data = await this.ordersService.crateProductOrder(reseller_id, product_id,createOrderDto);
      return {
        success: true,
        data: data,
        message: 'Order created successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/reseller/:id')
  async createResellerOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<WebResponse<any>> {
    try {
      const data = await this.ordersService.createResellerOrder(
        id,
        createOrderDto,
      );
      return {
        success: true,
        data: data,
        message: 'Order created successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<WebResponse<any>> {
    try {
      const data =await this.ordersService.findAll();

      return {
        success: true,
        data: data,
        message: 'Orders fetched successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const data =await this.ordersService.findOne(id);
      return {
        success: true,
        data: data,
        message: 'Order fetched successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      const data = await this.ordersService.update(id, updateOrderDto);

      return {
        success: true,
        data: data,
        message: 'Order updated successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    try {
      const data = await this.ordersService.remove(id);

      return {
        success: true,
        data: data,
        message: 'Order deleted successfully',
        statusCode: HttpStatus.OK,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
