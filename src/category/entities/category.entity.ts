/* eslint-disable prettier/prettier */
import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    title: string
    @ManyToMany(() => Product, (product) => product.categories)
    products: Product[]
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}
