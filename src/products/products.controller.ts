/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
    await this.productsService.create(createProductDto);
    return res.status(HttpStatus.CREATED).json({
      message: "محصول ایجاد شد", status_code: HttpStatus.CREATED
    })
  }

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.productsService.findAll();
    return res.status(HttpStatus.CREATED).json({
      data, status_code: HttpStatus.CREATED
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.productsService.findOne(+id);
    return res.status(HttpStatus.CREATED).json({
      data, status_code: HttpStatus.CREATED
    })
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Res() res: Response) {
    await this.productsService.update(+id, updateProductDto);
    return res.status(HttpStatus.CREATED).json({
      message: "محصول ویرایش شد", status_code: HttpStatus.CREATED
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.productsService.remove(+id);
    return res.status(HttpStatus.CREATED).json({
      message: "محصول حذف شد", status_code: HttpStatus.CREATED
    })
  }
}
