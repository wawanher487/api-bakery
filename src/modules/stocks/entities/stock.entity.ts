import { Product } from "src/modules/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "stock" })
export class Stock {
    @PrimaryGeneratedColumn()
    stock_id: number;

    @Column()
    quantity: number;

    @Column()
    lokasi_gudang: string;

    @Column()
    last_updated: Date;

    @ManyToOne(() => Product, (product) => product.stock)
    product: Product;
}