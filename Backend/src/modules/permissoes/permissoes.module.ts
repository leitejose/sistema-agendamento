import { Module } from '@nestjs/common';

import { PermissoesService } from './permissoes.service';
import { PermissoesResolver } from './permissoes.resolver';
import { PrismaModule } from 'prisma/prisma.module'; // Importe o PrismaModule

@Module({
  imports: [
    PrismaModule, // Importe o PrismaModule
  ],
  providers: [PermissoesService, PermissoesResolver],
})
export class PermissoesModule {}
