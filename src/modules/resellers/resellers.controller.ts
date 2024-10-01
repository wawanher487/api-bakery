import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ResellersService } from './resellers.service';
import { CreateResellerDto, ResponReseller } from './dto/create-reseller.dto';
import { UpdateResellerDto } from './dto/update-reseller.dto';
import { WebResponse } from 'src/common/model/web.model';

@Controller('reseller')
export class ResellersController {
  constructor(private readonly resellersService: ResellersService) {}

  @Post('add')
  async create(
    @Body() createResellerDto: CreateResellerDto,
  ): Promise<WebResponse<ResponReseller>> {
    try {
      const data = await this.resellersService.create(createResellerDto);

      return {
        success: true,
        data: data,
        message: 'Reseller created successfully',
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

  @Get()
  async findAll(): Promise<WebResponse<ResponReseller[]>> {
    try {
      const data = await this.resellersService.findAll();

      return {
        success: true,
        data: data,
        message: 'Reseller created successfully',
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
  ): Promise<WebResponse<ResponReseller>> {
    try {
      const data = await this.resellersService.findOne(id);

      return {
        success: true,
        data: data,
        message: 'Reseller successfully',
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

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResellerDto: UpdateResellerDto,
  ): Promise<WebResponse<ResponReseller>> {
    try {
      const response = await this.resellersService.update(
        id,
        updateResellerDto,
      );

      return {
        success: true,
        data: response,
        message: 'Reseller updated successfully',
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

  @Delete('delete/:id')
  async remove(@Param('id') id: number): Promise<WebResponse<any>> {
    try {
      const data = await this.resellersService.remove(id);

      return {
        success: true,
        data: data,
        message: 'Reseller deleted successfully',
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
