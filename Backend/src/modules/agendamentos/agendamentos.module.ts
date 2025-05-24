import { Module } from '@nestjs/common';
import { AgendamentosResolver } from './agendamentos.resolver';
import { PrismaModule } from '../../../prisma/prisma.module'; // Certifique-se de usar o caminho correto

@Module({
  imports: [PrismaModule], // Importe o PrismaModule
  providers: [AgendamentosResolver],
})
export class AgendamentosModule {}
