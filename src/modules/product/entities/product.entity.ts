import { Order } from "src/modules/orders/entities/order.entity";
import { Stock } from "src/modules/stocks/entities/stock.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'products'})
export class Product {
    @PrimaryGeneratedColumn()
    product_id: number;

    @Column({name: 'product_name'})
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    category: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    @OneToMany(() => Stock, (stock) => stock.product)
    stock: Stock[];

    @OneToMany(() => Order, (order) => order.product)
    order: Order[];
}
