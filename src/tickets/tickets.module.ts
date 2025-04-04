/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), UserModule],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule { }
