import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum payment_method {
  transfer = 'transfer',
  cash = 'cash',
  creadit_card = 'credit card',
}

@Entity({ name: 'payment' })
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @Column()
  payment_date: Date;

  @Column()
  payment_method: payment_method;

  @Column()
  amount_paid: number;
}
