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
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, ResponProduct } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { WebResponse } from 'src/common/model/web.model';
import { CreateStockDto } from '../stocks/dto/create-stock.dto';
// import { AuthGuard } from 'src/common/guards/auth.guard';
import { Throttle } from '@nestjs/throttler';

// @UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/:id/product')
  createStockProduct(
    @Param('id', ParseIntPipe) product_id: number,
    @Body() createStockDto: CreateStockDto,
  ) {
    return this.productService.createProductStock(product_id, createStockDto);
  }

  @Post('/add')
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<WebResponse<ResponProduct>> {
    try {
      const product = await this.productService.create(createProductDto);

      return {
        success: true,
        data: product,
        message: 'Product created successfully',
        statusCode: HttpStatus.OK,
      };
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

  @Throttle({default: { limit: 5, ttl: 6000 }})
  @Get()
  async findAll(): Promise<WebResponse<ResponProduct[]>> {
    try {
      const product = await this.productService.findAll();

      return {
        success: true,
        data: product,
        message: 'Product created successfully',
        statusCode: HttpStatus.OK,
      };
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

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WebResponse<ResponProduct>> {
    try {
      const product = await this.productService.findOne(id);

      return {
        success: true,
        data: product,
        message: 'Product successfully',
        statusCode: HttpStatus.OK,
      };
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

  @Patch('update/:product_id')
  async update(
    @Param('product_id', ParseIntPipe) product_id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<WebResponse<ResponProduct>> {
    try {
      const product = await this.productService.update(
        product_id,
        updateProductDto,
      );
      return {
        success: true,
        data: product,
        message: 'Product updated successfully',
        statusCode: HttpStatus.OK,
      };
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

  @Delete('delete/:product_id')
  async remove(
    @Param('product_id', ParseIntPipe) product_id: number,
  ): Promise<WebResponse<any>> {
    try {
      const product = await this.productService.remove(product_id);

      return {
        success: true,
        data: null,
        message: 'Product deleted successfully',
        statusCode: HttpStatus.OK,
      };
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
}
