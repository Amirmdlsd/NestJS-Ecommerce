/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumberString, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    display_name: string

    @IsNotEmpty()
    @IsNumberString()
    mobile: string

    @MinLength(8)
    @IsNotEmpty()
    password: string
}