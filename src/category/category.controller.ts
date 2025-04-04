/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @Res() res: Response) {
    await this.categoryService.create(createCategoryDto);
    return res.status(HttpStatus.CREATED).json({ message: "دسته بندی ایجاد شد", status_code: HttpStatus.CREATED })
  }

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.categoryService.findAll();
    return res.status(HttpStatus.OK).json({ data, status_code: HttpStatus.OK })

  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.categoryService.findOne(+id);
    return res.status(HttpStatus.CREATED).json({ data, status_code: HttpStatus.CREATED })

  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @Res() res: Response) {
    await this.categoryService.update(+id, updateCategoryDto);
    return res.status(HttpStatus.OK).json({ message: "دسته بندی وبرایش شد", status_code: HttpStatus.OK })

  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.categoryService.remove(+id);
    return res.status(HttpStatus.CREATED).json({ message: "دسته بندی حذف شد", status_code: HttpStatus.CREATED })

  }
}
