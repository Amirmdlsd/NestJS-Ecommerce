/* eslint-disable prettier/prettier */
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional, IsString, Length, MinLength } from "class-validator";
import { UserRole } from "../enum/user_role.enum";


export class CreateUserDto {
    @IsNotEmpty({ message: "شماره موبایل نباید خالی باشد " })
    @IsNumberString()
    @Transform(({ value }) => value.trim())
    @Length(11, 11, { message: "شماره موبایل باید 11 رقم باشد" })
    // @Matches('/^.{11}$/')
    mobile: string;

    @IsString({ message: "نام باید رشته باشد" })
    @IsNotEmpty()
    display_name: string

    @IsOptional()
    @IsString({ message: "پسورد باید رشته باشد" })
    @MinLength(8, { message: "رمز عبور باید 8 رقم باشد" })
    password: string

    @IsEnum(UserRole)
    @IsOptional()
    role: UserRole

}
