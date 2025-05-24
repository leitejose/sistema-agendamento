import { Module } from '@nestjs/common';
import { UtentesService } from './utentes.service';
import { UtentesResolver } from './utentes.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [UtentesResolver, UtentesService, PrismaService],
})
export class UtentesModule {}
