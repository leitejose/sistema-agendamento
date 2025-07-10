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
    return `This action updates a #${id} disponibilidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} disponibilidade`;
  }

  async createMany(data: CreateDisponibilidadeInput[]) {
    await this.prisma.disponibilidade.createMany({
      data: data.map((d) => ({
        ...d,
        hora_inicio: d.hora_inicio, // agora é Date
        hora_fim: d.hora_fim, // agora é Date
      })),
    });
    // Retorne apenas pelo colaborador
    return this.prisma.disponibilidade.findMany({
      where: {
        id_colaborador: data[0].id_colaborador,
      },
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

    // 2. Use a lógica da função fornecida anteriormente (adapte para async se necessário)
    // ...cole a função getHorariosDisponiveis aqui, adaptando para usar os dados acima...

    // Exemplo de retorno:
    return { horarios: [], mensagem: '' }; // { horarios: string[], mensagem?: string }
  }
}
