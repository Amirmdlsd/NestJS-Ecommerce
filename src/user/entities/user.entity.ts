/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../enum/user_role.enum";
import { Address } from "src/address/entities/address.entity";
import { Ticket } from "src/tickets/entities/ticket.entity";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    mobile: string
    @Column({ nullable: true })
    display_name: string
    @Column({ nullable: true })
    password: string
    @Column({ type: "enum", enum: UserRole, default: UserRole.NORMAL_USER })
    role: UserRole
    @OneToMany(() => Address, (address) => address.user)
    address: Address[]
    @OneToMany(() => Ticket, (ticket) => ticket.user)
    tickets: Ticket[]
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}
