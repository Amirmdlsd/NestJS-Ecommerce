/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../enum/user_role.enum';

export class UpdateUserDto {
    @IsString({ message: "نام باید رشته باشد" })
    @IsNotEmpty()
    display_name: string


    @IsEnum(UserRole)
    @IsOptional()
    role: UserRole
}
