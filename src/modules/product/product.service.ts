import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto, ResponProduct } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Stock } from '../stocks/entities/stock.entity';
import { CreateStockDto } from '../stocks/dto/create-stock.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ResponProduct> {
    const product = await this.productRepository.create({
      ...createProductDto,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return this.productRepository.save(product);
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
    });

    return await this.stockRepository.save(newStock);
  }

  async findAll(): Promise<any> {
    const data = await this.productRepository.find({ relations: ['stock',] });

    return data;
  }

  async findOne(id: number): Promise<ResponProduct> {
    const product = await this.productRepository.findOne({
      where: { product_id: id },
      relations: ['stock','order'],
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async update(
    product_id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<any> {
    const product = await this.productRepository.findOneBy({ product_id });
    console.log(product);

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const updatedProduct = this.productRepository.update(
      product_id,
      updateProductDto,
    );

    return updatedProduct;
  }

  async remove(product_id: number): Promise<any> {
    const product = await this.productRepository.findOneBy({ product_id });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    } else {
      const deletedProduct = this.productRepository.delete(product_id);

      return deletedProduct;
    }
  }
}
