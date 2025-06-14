import { Module } from '@nestjs/common';
import { ColaboradoresService } from './colaborador.service';
import { ColaboradoresResolver } from './colaborador.resolver';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ColaboradoresResolver, ColaboradoresService],
  exports: [],
})
export class ColaboradoresModule {}
