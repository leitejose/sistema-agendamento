import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoResolver } from './cargo.resolver';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [CargoService, CargoResolver, PrismaService],
})
export class CargoModule {}
