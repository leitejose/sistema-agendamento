import { Module } from '@nestjs/common';
import { AgendamentosResolver } from './agendamentos.resolver';
import { PrismaService } from '../../../prisma/prisma.service';
import { NotificationModule } from '../notifications/notification.module'; // <-- importe aqui

@Module({
  imports: [NotificationModule], // <-- adicione aqui
  providers: [AgendamentosResolver, PrismaService],
})
export class AgendamentosModule {}
