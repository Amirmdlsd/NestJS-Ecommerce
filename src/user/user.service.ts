/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from './enum/user_role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto)
    try {
      const user = await this.userRepository.create({ ...createUserDto })
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async findAll(role?: UserRole, page: number = 1, limit: number = 10): Promise<User[]> {
    try {
      const skip = (page - 1) * limit;

      const whereCondition = role ? { role } : {};

      return await this.userRepository.find({
        where: whereCondition,
        skip,
        take: limit,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }


  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { id } })
    } catch (error) {
      throw new BadRequestException(error)

    }
  }
  async findOneByPhone(mobile: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { mobile } })
      if(!user)throw new BadRequestException("کاربریافت نشد");
      return user;
    } catch (error) {
      throw new BadRequestException(error)

    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.update({ id }, { ...updateUserDto })
      return await this.userRepository.findOne({ where: { id } })
    } catch (error) {
      throw new BadRequestException(error)
    }

  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
