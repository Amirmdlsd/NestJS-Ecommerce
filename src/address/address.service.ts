/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { privateDecrypt } from 'crypto';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepositry: Repository<Address>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }
  async create(createAddressDto: CreateAddressDto) {
    const { user_id } = createAddressDto;
    const user = await this.userRepository.findOneByOrFail({ id: user_id });
    const address = await this.addressRepositry.create({ ...createAddressDto, user });
    return this.addressRepositry.save(address)
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ["user"] });
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id }, relations: ["user"] });
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    return await this.addressRepositry.update(id, updateAddressDto)
  }

  async remove(id: number) {
    const address = await this.userRepository.findOne({ where: { id } })
    if (!address) throw new BadRequestException("not found");
    return await this.addressRepositry.delete(id)
  }
}


