import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reseller } from 'src/modules/resellers/entities/reseller.entity';
import { Payment } from 'src/modules/payments/entities/payment.entity';
import { Product } from 'src/modules/product/entities/product.entity';

export enum status {
  pending = 'pending',
  completed = 'completed',
  canceled = 'canceled',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @ManyToOne(() => Reseller, (reseller) => reseller.order)
  reseller: Reseller;

  @ManyToOne(() => Product, (product) => product.order)
  product: Product;

  @Column()
  order_date: Date;

  @Column()
  quantity: number;

  @Column()
  total: number;

  @Column({
    type: 'enum',
    default: status.pending,
    enum: [status.pending, status.completed, status.canceled],
  })
  order_status: status;

  // @OneToOne(() => Payment)
  // @JoinColumn()
  // payment: Payment;
}
