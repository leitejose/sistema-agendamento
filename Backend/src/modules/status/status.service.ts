import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service'; // Certifique-se de usar o caminho correto

@Injectable()
export class StatusAgendamentoService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.statusAgendamento.findMany();
  }
}
