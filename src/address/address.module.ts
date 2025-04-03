/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { AddressService } from './address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Address])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule { }
