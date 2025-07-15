import { Injectable } from '@nestjs/common';
import { CreateDisponibilidadeInput } from './dto/create-disponibilidade.input';
import { UpdateDisponibilidadeInput } from './dto/update-disponibilidade.input';
import { PrismaService } from '../../../prisma/prisma.service'; // ajuste o caminho se necessário

@Injectable()
export class DisponibilidadesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDisponibilidadeInput: CreateDisponibilidadeInput) {
    return 'This action adds a new disponibilidade';
  }

  async findAll() {
    return this.prisma.disponibilidade.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} disponibilidade`;
  }

  update(id: number, updateDisponibilidadeInput: UpdateDisponibilidadeInput) {
    return this.prisma.disponibilidade.update({
      where: { id },
      data: {
        ...updateDisponibilidadeInput,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.disponibilidade.delete({
      where: { id },
    });
  }

  async createMany(data: CreateDisponibilidadeInput[]) {
    await this.prisma.disponibilidade.createMany({
      data,
      skipDuplicates: true,
    });
    // Retorne todos do colaborador (ou outro filtro)
    return this.prisma.disponibilidade.findMany({
      where: { id_colaborador: data[0].id_colaborador },
      orderBy: { id: 'desc' },
    });
  }

  async getHorariosDisponiveis(
    id_colaborador: number,
    dataSelecionada: string,
    intervaloMinutos = 30,
  ) {
    // 1. Busque dados do banco
    const [disponibilidades, ferias, agendamentos] = await Promise.all([
      this.prisma.disponibilidade.findMany({ where: { id_colaborador } }),
      this.prisma.ferias.findMany({
        where: { colaborador_id: id_colaborador },
      }),
      this.prisma.agendamento.findMany({
        where: { id_colaborador, data_agendamento: dataSelecionada },
      }),
    ]);

    // Exemplo de retorno:
    return { horarios: [], mensagem: '' }; // { horarios: string[], mensagem?: string }
  }
}
