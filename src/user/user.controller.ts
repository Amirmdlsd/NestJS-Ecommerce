/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { UserRole } from './enum/user_role.enum';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    await this.userService.create(createUserDto);
    return response.status(HttpStatus.CREATED).json({ message: "کاربر ایجاد شد", status_code: HttpStatus.CREATED })
  }

  @Get()
  async findAll(
    @Res() response: Response,
    @Query("role") role?: UserRole,
    @Query("limit") limit: number = 10,
    @Query("page") page: number = 1,

  ) {
    const data = await this.userService.findAll(role, limit, page);
    return response.status(HttpStatus.OK).json({
      data,
      status_code: HttpStatus.OK
    })

  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response,) {

    const data = await this.userService.findOne(+id);
    return response.status(HttpStatus.OK).json({

      data,
      status_code: HttpStatus.OK
    })
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any, @Res() response: Response) {
    const updateUserDto = plainToInstance(UpdateUserDto, body, {
      excludeExtraneousValues: true
    })
    await this.userService.update(+id, updateUserDto);
    return response.status(HttpStatus.OK).json({
      message: "کاربر ویرایش شد",
      status_code: HttpStatus.OK
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    await this.userService.remove(+id);
    return response.status(HttpStatus.OK).json({
      status_code: HttpStatus.OK
    })
  }
}
