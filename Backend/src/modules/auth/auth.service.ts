// src/modules/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const colaborador = await this.prisma.colaborador.findUnique({
      where: { email },
    });

    if (!colaborador) {
      console.log('Colaborador não encontrado:', email);
      throw new NotFoundException('Colaborador não encontrado');
    }

    console.log('Senha digitada:', password);
    console.log('Hash armazenado no banco de dados:', colaborador.senha);

    const isPasswordValid = await bcrypt.compare(password, colaborador.senha);
    console.log('Senha válida:', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.jwtService.sign({ id: colaborador.id });
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    const colaborador = await this.prisma.colaborador.findUnique({
      where: { email },
    });

    if (!colaborador) {
      throw new NotFoundException('Colaborador não encontrado');
    }

    const token = this.jwtService.sign(
      { id: colaborador.id },
      { expiresIn: '1h' }, // Token expira em 1 hora
    );

    const resetLink = `http://localhost:5173/new-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Redefinição de Senha',
      text: `Olá ${colaborador.descricao},\n\nClique no link abaixo para redefinir sua senha:\n${resetLink}\n\nSe você não solicitou essa redefinição, ignore este e-mail.`,
      html: `
        <h1>Olá, ${colaborador.descricao}</h1>
        <p>Você solicitou a redefinição de sua senha. Clique no link abaixo para redefini-la:</p>
        <a href="${resetLink}">Redefinir Senha</a>
        <p>Se você não solicitou essa redefinição, ignore este e-mail.</p>
      `,
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<string> {
    try {
      // Verifica o token JWT
      const payload = this.jwtService.verify(token);

      // Busca o usuário pelo ID do payload
      const colaborador = await this.prisma.colaborador.findUnique({
        where: { id: payload.id },
      });

      if (!colaborador) {
        throw new NotFoundException('Colaborador não encontrado');
      }

      // Criptografa a nova senha
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Atualiza a senha no banco de dados
      await this.prisma.colaborador.update({
        where: { id: colaborador.id },
        data: { senha: hashedPassword },
      });

      return 'Senha redefinida com sucesso.';
    } catch (error) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
