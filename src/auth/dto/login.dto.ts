/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumberString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsNumberString()
    mobile: string

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    password: string
}