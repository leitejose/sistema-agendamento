// src/app.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST || 'smtp.example.com', // Valor padrão para o host
        port: parseInt(process.env.EMAIL_PORT || '587', 10), // Valor padrão para a porta
        auth: {
          user: process.env.MAIL_USER || 'default@example.com', // Valor padrão para o usuário
          pass: process.env.MAIL_PASS || 'defaultpassword', // Valor padrão para a senha
        },
      },
      defaults: {
        from: process.env.EMAIL_FROM || '"No Reply" <default@example.com>', // Valor padrão para o remetente
      },
    }),
  ],
  providers: [AuthService, AuthResolver, PrismaService],
})
export class AuthModule {}
