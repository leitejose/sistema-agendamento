import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginInput } from './dto/login.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './entities/auth-payload.entity';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput): Promise<AuthPayload> {
    const { email, senha } = loginInput;

    console.log('Tentando autenticar:', email);

    const colaborador = await this.prisma.colaborador.findUnique({
      where: { email },
    });
    if (!colaborador) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Se usar bcrypt, descomente a linha abaixo:
    if (!(await bcrypt.compare(senha, colaborador.senha))) {
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
