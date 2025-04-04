/* eslint-disable prettier/prettier */
import { Category } from "src/category/entities/category.entity";
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from "typeorm";
@Entity({ name: "products" })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string
    @Column()
    description: string
    @Column()
    price: number
    @Column()
    stock: number
    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable({
        name: "product_category",
        joinColumn: {
            name: "product_id", referencedColumnName: "id"
        },
        inverseJoinColumn: { name: "category_id", referencedColumnName: "id" }
    })
    categories: Category[]
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}
