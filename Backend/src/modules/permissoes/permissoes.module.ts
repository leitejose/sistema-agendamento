import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permissao } from './entities/permissoes.entity';
import { PermissoesService } from './permissoes.service';
import { PermissoesResolver } from './permissoes.resolver';
import { PrismaModule } from 'prisma/prisma.module'; // Importe o PrismaModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Permissao]), // Registre a entidade Permissao
    PrismaModule, // Importe o PrismaModule
  ],
  providers: [PermissoesService, PermissoesResolver],
  exports: [TypeOrmModule],
})
export class PermissoesModule {}
