/* eslint-disable prettier/prettier */
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    province: string
    @Column({ nullable: false })
    city: string
    @Column({ nullable: false })
    address: string;
    @Column({ length: 10 })
    postal_code: string
    @Column({ length: 11 })
    reciever_mobile: string
    @Column({ nullable: true })
    discription: string

    @ManyToOne(() => User, (user) => user.address)
    user: User
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date

}
