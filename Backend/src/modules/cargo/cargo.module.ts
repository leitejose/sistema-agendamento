import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cargo } from './entities/cargo.entity'; // Certifique-se de que o caminho está correto
import { CargoService } from './cargo.service';
import { CargoResolver } from './cargo.resolver';
import { PrismaService } from 'prisma/prisma.service'; // Supondo que você tenha o Prisma configurado

@Module({
  imports: [TypeOrmModule.forFeature([Cargo])], // Registre a entidade Cargo aqui
  providers: [CargoService, CargoResolver, PrismaService],
  exports: [TypeOrmModule], // Exporte o TypeOrmModule para uso em outros módulos, se necessário
})
export class CargoModule {}
