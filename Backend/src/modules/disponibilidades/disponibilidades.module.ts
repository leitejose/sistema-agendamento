import { Module } from '@nestjs/common';
import { DisponibilidadesService } from './disponibilidades.service';
import { DisponibilidadesResolver } from './disponibilidades.resolver';
import { PrismaService } from '../../../prisma/prisma.service'; // ajuste o caminho se necessário

@Module({
  providers: [DisponibilidadesResolver, DisponibilidadesService, PrismaService],
})
export class DisponibilidadesModule {}
