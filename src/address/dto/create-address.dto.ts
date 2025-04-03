/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, Length, IsOptional } from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty()
    user_id: number;
    @IsString()
    @IsNotEmpty({ message: "فیلد استان نمیتواند خالی باشد" })
    province: string;
    @IsString()
    @IsNotEmpty({ message: "فیلد شهر نمیتواند خالی باشد" })
    city: string
    @IsString()
    @Length(10, 10)
    @IsNotEmpty({ message: "فیلد کدپستی نمیتواند خالی باشد" })
    postal_code: string
    @IsString()
    @IsNotEmpty({ message: "فیلد آدرس نمیتواند خالی باشد" })
    address: string
    @IsString()
    @Length(10, 10)
    reciever_mobile: string
    @IsString()
    @IsOptional()
    description: string
}
