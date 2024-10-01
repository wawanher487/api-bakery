import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStockDto, ResponsStock } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(createStockDto: CreateStockDto) {
    const data = await this.stockRepository.create({
      ...createStockDto,
      last_updated: new Date(),
    });

    return await this.stockRepository.save(data);
  }

  async createProductStock(product_id: number, createStockDto: CreateStockDto) {
    const product = await this.productRepository.findOneBy({
      product_id,
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const newStock = await this.stockRepository.create({
      ...createStockDto,
      last_updated: new Date(),
      product: product,
    })

    return await this.stockRepository.save(newStock);
  }

  async findAll() {
    return await this.stockRepository.find();
  }

  async findOne(id: number): Promise<ResponsStock> {
    const data = await this.stockRepository.findOne({
      where: { stock_id: id },
    });

    if (!data) {
      throw new HttpException('Stock not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    const data = await this.stockRepository.findOne({
      where: { stock_id: id },
    });

    return await this.stockRepository.save({ ...data, ...updateStockDto });
  }

  async remove(id: number) {
    const data = await this.stockRepository.findOne({
      where: { stock_id: id },
    });

    if (!data) {
      throw new HttpException('Stock not found', HttpStatus.NOT_FOUND);
    }

    return this.stockRepository.delete(id);
  }
}
