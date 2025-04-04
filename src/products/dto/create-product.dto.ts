/* eslint-disable prettier/prettier */
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    title: string
    @IsString()
    description: string
    @IsInt()
    stock: number;
    @IsOptional()
    @IsArray()
    category_ids?: number[]
}
