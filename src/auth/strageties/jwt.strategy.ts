/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
@Injectable()
export class JwtStrategies extends PassportStrategy(Strategy) {
    constructor(readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get("JWT_SECRET")
        })
    }

    async validate(payload: any) {
        return { userId: payload.sub, mobile: payload.mobile, display_name: payload.display_name }
    }
}