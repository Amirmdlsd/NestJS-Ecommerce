/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
export class CreateTicketDto {
    @IsNotEmpty()
    user_id: number;
    @IsString()
    @IsNotEmpty()
    title: string
    @IsString()
    @IsNotEmpty()
    subjet: string
    @IsString()
    @IsNotEmpty()
    description: string;
    @IsNumber()
    @IsOptional()
    reply_to: number
}
