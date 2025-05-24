import { Module } from '@nestjs/common';
import { StatusAgendamentoService } from './status.service';
import { StatusAgendamentoResolver } from './status.resolver';
import { PrismaModule } from '../../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [StatusAgendamentoResolver, StatusAgendamentoService],
  exports: [StatusAgendamentoService],
})
export class StatusAgendamentoModule {}
