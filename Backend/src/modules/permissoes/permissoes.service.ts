import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePermissoesInput } from './dto/create-permissoes.input';
import { UpdatePermissoesInput } from './dto/update-permissoes.input';

@Injectable()
export class PermissoesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPermissoesInput: CreatePermissoesInput) {
    return this.prisma.permissao.create({
      data: createPermissoesInput,
    });
  }

  async findAll() {
    return this.prisma.permissao.findMany();
  }

  async findOne(id: number) {
    const permissao = await this.prisma.permissao.findUnique({
      where: { id },
    });

    if (!permissao) {
      throw new NotFoundException(`Permissão com ID ${id} não encontrada`);
    }
    return permissao;
  }

  async update(id: number, updatePermissoesInput: UpdatePermissoesInput) {
    const permissao = await this.prisma.permissao.findUnique({ where: { id } });

    if (!permissao) {
      throw new NotFoundException(`Permissão com ID ${id} não encontrada`);
    }

    return this.prisma.permissao.update({
      where: { id },
      data: updatePermissoesInput,
    });
  }

  async remove(id: number) {
    const permissao = await this.prisma.permissao.findUnique({ where: { id } });

    if (!permissao) {
      throw new NotFoundException(`Permissão com ID ${id} não encontrada`);
    }

    return this.prisma.permissao.delete({ where: { id } });
  }
}
