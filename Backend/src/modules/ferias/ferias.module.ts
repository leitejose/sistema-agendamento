import { Module } from '@nestjs/common';
import { FeriasService } from './ferias.service';
import { FeriasResolver } from './ferias.resolver';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  providers: [FeriasResolver, FeriasService, PrismaService],
})
export class FeriasModule {}
