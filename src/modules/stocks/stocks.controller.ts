import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto, ResponsStock } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { WebResponse } from 'src/common/model/web.model';

@Controller('stock')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post('add')
  async create(@Body() createStockDto: CreateStockDto) {
    return await this.stocksService.create(createStockDto);
  }

  @Post('/:id/product')
  async createStockProduct(
    @Param('id', ParseIntPipe) product_id: number,
    @Body() createStockDto: CreateStockDto,
  ) {
    return await this.stocksService.createProductStock(product_id, createStockDto);
  }

  @Get()
  async findAll() {
    return await this.stocksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<WebResponse<ResponsStock>> {
    try {
      const data =await this.stocksService.findOne(id);
      return {
        success: true,
        data: data,
        message: 'Stock successfully',
        statusCode: HttpStatus.OK,
      }
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
          statusCode: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return await this.stocksService.update(id, updateStockDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.stocksService.remove(id);
  }
}
