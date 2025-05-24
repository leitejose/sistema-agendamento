import { Module } from '@nestjs/common';
import { DisponibilidadesService } from './disponibilidades.service';
import { DisponibilidadesResolver } from './disponibilidades.resolver';

@Module({
  providers: [DisponibilidadesResolver, DisponibilidadesService],
})
export class DisponibilidadesModule {}
