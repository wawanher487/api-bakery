import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateResellerDto, ResponReseller } from './dto/create-reseller.dto';
import { UpdateResellerDto } from './dto/update-reseller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reseller } from './entities/reseller.entity';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class ResellersService {
  constructor(
    @InjectRepository(Reseller) private resellerRepository: Repository<Reseller>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(createResellerDto: CreateResellerDto): Promise<ResponReseller> {
    const reseller = await this.resellerRepository.create({
      ...createResellerDto,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.resellerRepository.save(reseller);
  }

  async findAll(): Promise<ResponReseller[]> {
    const data = await this.resellerRepository.find({relations:['order']});

    return data;
  }

  async findOne(id: number): Promise<ResponReseller> {
    const data = await this.resellerRepository.findOne({
      where: { reseller_id: id },
      relations: ['order'],
    });

    if (!data) {
      throw new HttpException('Reseller not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async update(id: number, updateResellerDto: UpdateResellerDto): Promise<any> {
    const data = await this.resellerRepository.findOneBy({ reseller_id: id });

    if (!data) {
      throw new HttpException('Reseller not found', HttpStatus.NOT_FOUND);
    }

    const update = await this.resellerRepository.update(id, updateResellerDto);

    return update;
  }

  async remove(id: number): Promise<any> {
    const data = await this.resellerRepository.findOneBy({ reseller_id: id });

    if (!data) {
      throw new HttpException('Reseller not found', HttpStatus.NOT_FOUND);
    }

    return await this.resellerRepository.delete(id);
  }
}
