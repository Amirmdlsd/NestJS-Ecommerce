/* eslint-disable prettier/prettier */
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    subject: string;
    @Column()
    description: string;
    @ManyToOne(() => User, (user) => user.tickets)
    user: User;
    @ManyToOne(() => Ticket, (ticket) => ticket.replies, { nullable: true })
    reply_to: Ticket
    @OneToMany(() => Ticket, (ticket) => ticket.reply_to)
    replies: Ticket[]
}
