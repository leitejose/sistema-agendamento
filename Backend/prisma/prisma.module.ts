import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Certifique-se de exportar o PrismaService
})
export class PrismaModule {}
