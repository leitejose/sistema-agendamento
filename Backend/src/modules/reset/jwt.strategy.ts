import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'mmmedicina', // mesmo segredo do login!
    });
  }

  async validate(payload: any) {
    // Log para depuração
    console.log('Payload no JwtStrategy:', payload);
    return { userId: payload.id, email: payload.email };
  }
}
