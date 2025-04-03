/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Response } from 'express';
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  async create(@Res() res: Response,
    @Body() createAddressDto: CreateAddressDto) {
    await this.addressService.create(createAddressDto);
    return res.status(HttpStatus.CREATED).json({
      message: "آدرس ایجاد شد", status_code: HttpStatus.CREATED
    })
  }

  @Get()
  async findAll(@Res() res: Response,
  ) {
    const data = await this.addressService.findAll();
    return res.status(HttpStatus.OK).json({
      data,
      status_code: HttpStatus.OK
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response,
  ) {
    const data = await this.addressService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      data,
      status_code: HttpStatus.OK
    })
  }

  @Patch(':id',)
  async update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto, @Res() res: Response,
  ) {
    await this.addressService.update(+id, updateAddressDto);
    return res.status(HttpStatus.OK).json({
      message: "آدرس ویرایش شد", status_code: HttpStatus.OK
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response,
  ) {
    await this.addressService.remove(+id);
    return res.status(HttpStatus.CREATED).json({
      message: "آدرس حذف شد", status_code: HttpStatus.CREATED
    })
  }
}
