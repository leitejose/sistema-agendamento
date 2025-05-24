import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Colaborador } from './entities/colaborador.entity'; // Certifique-se de que o caminho está correto
import { ColaboradoresService } from './colaborador.service';
import { ColaboradoresResolver } from './colaborador.resolver';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Colaborador]), // Registre a entidade Colaborador aqui
    PrismaModule,
  ],
  providers: [ColaboradoresResolver, ColaboradoresService],
  exports: [TypeOrmModule], // Exporte o TypeOrmModule para uso em outros módulos, se necessário
})
export class ColaboradoresModule {}
