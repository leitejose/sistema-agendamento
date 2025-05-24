import { Module } from '@nestjs/common';
import { ServicosService } from './servicos.service';
import { ServicosResolver } from './servicos.resolver';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ServicosResolver, ServicosService],
})
export class ServicosModule {}
