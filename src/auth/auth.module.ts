/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JwtStrategies } from "./strageties/jwt.strategy"
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';


@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get("JWT_SECRET"),
                signOptions: { expiresIn: configService.get("JWT_EXPIRATION") }
            })
        })
        , UserModule
    ],

    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
