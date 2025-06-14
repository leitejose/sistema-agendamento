import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateFeriasInput } from './dto/create-ferias.input';

@Injectable()
export class FeriasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFeriasInput) {
    return this.prisma.ferias.create({ data });
  }

  async findAll() {
    return this.prisma.ferias.findMany();
  }

  async findOne(id: number) {
    return this.prisma.ferias.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return this.prisma.ferias.delete({ where: { id } });
  }

  async update(id: number, data: any) {
    const { colaborador_id, ...rest } = data;
    return this.prisma.ferias.update({
      where: { id },
      data: {
        ...rest,
        colaborador: colaborador_id
          ? { connect: { id: Number(colaborador_id) } }
          : undefined,
      },
    });
  }
}
