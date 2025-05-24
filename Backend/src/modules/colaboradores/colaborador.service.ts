import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateColaboradorInput } from './dto/create-colaborador.input';
import { UpdateColaboradorInput } from './dto/update-colaborador.input';

@Injectable()
export class ColaboradoresService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createColaboradorInput: CreateColaboradorInput) {
    const colaborador = await this.prisma.colaborador.create({
      data: createColaboradorInput,
    });
    return colaborador;
  }

  // Retorna todos os colaboradores
  async findAll() {
    return this.prisma.colaborador.findMany({
      include: {
        permissao: true, // Inclua a relação com a tabela de permissões
        cargo: true, // Inclua a relação com a tabela de cargos
      },
    });
  }

  // Retorna um colaborador específico por id
  async findOne(id: number) {
    return this.prisma.colaborador.findUnique({
      where: { id },
      include: {
        permissao: true, // Inclua a relação com a tabela de permissões
        cargo: true, // Inclua a relação com a tabela de cargos
      },
    });
  }

  // Atualiza um colaborador
  async update(id: number, updateColaboradorInput: UpdateColaboradorInput) {
    console.log('Atualizando colaborador com ID:', id);
    console.log('Dados de atualização:', updateColaboradorInput);

    return this.prisma.colaborador.update({
      where: { id },
      data: updateColaboradorInput,
    });
  }

  // Remove um colaborador
  async remove(id: number) {
    const colaborador = await this.prisma.colaborador.findUnique({
      where: { id },
    });

    if (!colaborador) {
      throw new Error(`Colaborador com ID ${id} não encontrado.`);
    }

    return this.prisma.colaborador.delete({ where: { id } });
  }
}
