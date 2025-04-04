/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Response } from 'express';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) { }

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto, @Res() res: Response) {
    await this.ticketsService.create(createTicketDto);
    return res.status(HttpStatus.CREATED).json({
      message: "تیکت ثبت شد", statuc_code: HttpStatus.CREATED
    })
  }

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.ticketsService.findAll();
    return res.status(HttpStatus.OK).json({
      data, statuc_code: HttpStatus.OK
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.ticketsService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      data, statuc_code: HttpStatus.OK
    })
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto, @Res() res: Response) {
    await this.ticketsService.update(+id, updateTicketDto);
    return res.status(HttpStatus.OK).json({
      message: "تیکت ویرایش شد", statuc_code: HttpStatus.OK
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.ticketsService.remove(+id);
    return res.status(HttpStatus.OK).json({
      message: "تیکت حذف شد", statuc_code: HttpStatus.OK
    })
  }
}
