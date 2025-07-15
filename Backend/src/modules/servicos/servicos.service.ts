import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateServicoInput } from './dto/create-servico.input';
import { UpdateServicoInput } from './dto/update-servico.input';
import { Servico } from '@prisma/client'; // Corrigido

@Injectable()
export class ServicosService {
  constructor(private prisma: PrismaService) {}

  async create(createServicoInput: CreateServicoInput): Promise<Servico> {
    return this.prisma.servico.create({
      data: createServicoInput,
    });
  }

  async findAll(): Promise<Servico[]> {
    return this.prisma.servico.findMany();
  }

  async findOne(id: number): Promise<Servico | null> {
    return (
      this.prisma.servico.findUnique({
        where: { id },
      }) ?? null
    );
  }

  async update(
    id: number,
    updateServicoInput: UpdateServicoInput,
  ): Promise<Servico> {
    return this.prisma.servico.update({
      where: { id },
      data: updateServicoInput,
    });
  }

  async remove(id: number): Promise<Servico> {
    return this.prisma.servico.delete({
      where: { id },
    });
  }
}
