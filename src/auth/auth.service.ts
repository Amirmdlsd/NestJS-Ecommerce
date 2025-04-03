/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcrypt";
import { UserRole } from 'src/user/enum/user_role.enum';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async register(mobile: string, password: string, display_name: string) {
        const alreadyUser = await this.userService.findOneByPhone(mobile);
        try {
            if (!alreadyUser) {
                const salt = await bcrypt.genSalt(10);
                const hasPass = await bcrypt.hash(password, salt);
                return await this.userService.create({ mobile, password: hasPass, display_name, role: UserRole.NORMAL_USER });
            } else {
                throw new BadRequestException("کاربر وجود دارد")
            }
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            }
            throw new InternalServerErrorException(error);

        }

    }

    async login(mobile: string, password: string) {
        const user = await this.userService.findOneByPhone(mobile);

        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestException("پسورد اشتباه است!");
        }
        const payload = { mobile: user.mobile, sub: user.id, display_name: user.display_name };
        const token = await this.jwtService.sign(payload);
        return { accessToken: token }
    }
}
