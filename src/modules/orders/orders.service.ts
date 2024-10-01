import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Reseller } from '../resellers/entities/reseller.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Reseller) private ResellerRepository: Repository<Reseller>,
    @InjectRepository(Product) private ProductRepository: Repository<Product>,
  ) {}

  async crateProductOrder(Reseller_id: number, product_id: number, createOrderDto: CreateOrderDto) {

    const reseller = await this.ResellerRepository.findOneBy({
      reseller_id: Reseller_id,
    });

    if (!reseller) {
      throw new HttpException('reseller not found', HttpStatus.NOT_FOUND);
    }

    const product = await this.ProductRepository.findOneBy({
      product_id: product_id,
    });

    
    if (!product) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }

    const price = product.price;

    const total = price * createOrderDto.quantity

    const order = await this.orderRepository.create({
      ...createOrderDto,
      total: total,
      order_date: new Date(),
      reseller: reseller,
      product: product,
    });

    return await this.orderRepository.save(order);
    
  }

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.create({
      ...createOrderDto,
      order_date: new Date(),
    });
    return await this.orderRepository.save(order);
  }

  async createResellerOrder(id: number, createOrderDto: CreateOrderDto) {
    const reseller = await this.ResellerRepository.findOneBy({
      reseller_id: id,
    });

    if (!reseller) {
      throw new HttpException('reseller not found', HttpStatus.NOT_FOUND);
    }

    const order = await this.orderRepository.create({
      ...createOrderDto,
      order_date: new Date(),
      reseller: reseller,
    });

    return await this.orderRepository.save(order);
  }

  async findAll() {
    const data = await this.orderRepository.find({ relations: ['reseller', 'product'] });

    if (!data) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { order_id: id },
      relations: ['reseller', 'product'],
    }, );
    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const data = await this.orderRepository.findOne({
      where: { order_id: id },
    });

    if (!data) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    const update = await this.orderRepository.update(id, updateOrderDto);

    return update;
  }

  async remove(id: number) {
    const data = await this.orderRepository.findOne({
      where: { order_id: id },
    });

    if (!data) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return await this.orderRepository.delete({ order_id: id });
  }
}
