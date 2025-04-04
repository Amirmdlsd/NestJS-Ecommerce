/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly userService: UserService
  ) { }
  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { user_id, reply_to } = createTicketDto;
    const user = await this.userService.findOne(user_id);
    let reply_to_ticket = null;
    if (reply_to) {
      reply_to_ticket = await this.ticketRepository.findOne({ where: { id: reply_to }, relations: ['reply_to'] })
      if (reply_to_ticket.reply_to) throw new BadRequestException("شما نمیتوانید این تیکت را ریپلای کنید")
    }
    const ticket = await this.ticketRepository.create({ ...createTicketDto, user, reply_to: reply_to_ticket });
    return this.ticketRepository.save(ticket)
  }

  async findAll() {
    const ticket = await this.ticketRepository.createQueryBuilder("tickets").where(
      "tickeys.reply_to IS NULL"
    ).getMany()
    return ticket;
  }

  async findOne(id: number) {
    return await this.ticketRepository.findOneOrFail({ where: { id }, relations: ["replay_to"] })
  }

  // async update(id: number, updateTicketDto: UpdateTicketDto) {
  //   const { user_id, reply_to } = updateTicketDto;
  //   const user = await this.userService.findOne(user_id);
  //   const ticket_reply_to = await this.ticketRepository.findOne({ where: { id: reply_to } })
  //   return await this.ticketRepository.update(+id, { user, ...updateTicketDto, reply_to: ticket_reply_to })
  // }

  async remove(id: number) {
    return await this.ticketRepository.delete(id)
  }
}
