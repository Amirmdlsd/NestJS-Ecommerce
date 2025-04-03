/* eslint-disable prettier/prettier */
import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { Response } from "express";


@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto, @Res() res: Response) {
        await this.authService.register(registerDto.mobile, registerDto.password, registerDto.display_name)
        return res.status(HttpStatus.CREATED).json({
            message: "ثبت نام انجام شد",
            status_code: HttpStatus.OK
        })
    }
    async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        await this.authService.login(loginDto.mobile, loginDto.password);
        return res.status(HttpStatus.CREATED).json({
            message: "ورود انجام شد",
            status_code: HttpStatus.OK
        })
    }
}