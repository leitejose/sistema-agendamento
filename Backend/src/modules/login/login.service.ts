import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colaborador } from '../colaboradores/entities/colaborador.entity';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './entities/auth-payload.entity';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Colaborador)
    private readonly colaboradorRepository: Repository<Colaborador>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput): Promise<AuthPayload> {
    const { email, senha } = loginInput;

    console.log('Tentando autenticar:', email);

    const colaborador = await this.colaboradorRepository.findOne({
      where: { email },
    });
    if (!colaborador) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (senha !== colaborador.senha) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = this.jwtService.sign({
      id: colaborador.id,
      email: colaborador.email,
    });

    const authPayload = { token, colaborador };

    console.log('AuthPayload gerado:', authPayload);

    return authPayload;
  }
}
