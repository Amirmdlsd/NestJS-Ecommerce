/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
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
      reply_to_ticket = await this.ticketRepository.findOneByOrFail({ id: reply_to })

    }
    const ticket = await this.ticketRepository.create({ ...createTicketDto, user, reply_to: reply_to_ticket });
    return this.ticketRepository.save(ticket)
  }

  async findAll() {
    return await this.ticketRepository.find({ relations: ['ticket', 'user'] });
  }

  async findOne(id: number) {
    return await this.ticketRepository.findOne({ where: { id } })
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const { user_id, reply_to } = updateTicketDto;
    const user = await this.userService.findOne(user_id);
    const ticket_reply_to = await this.ticketRepository.findOne({ where: { id: reply_to } })
    return await this.ticketRepository.update(+id, { user, ...updateTicketDto, reply_to: ticket_reply_to })
  }

  async remove(id: number) {
    return await this.ticketRepository.delete(id)
  }
}
