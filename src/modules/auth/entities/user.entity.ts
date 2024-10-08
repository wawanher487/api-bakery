import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RefreshToken } from "./refreshToken.entity";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
    refreshToken: RefreshToken[]
}
