import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PrismaService } from '../../../prisma/prisma.service';
import { Agendamento } from './entities/agendamento.entity';
import { CreateAgendamentoInput } from './dto/create-agendamento.input';
import { UpdateAgendamentoInput } from './dto/update-agendamento.input';
import { NotFoundException } from '@nestjs/common';
@Resolver(() => Agendamento)
export class AgendamentosResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Agendamento])
  async getAgendamentos() {
    return this.prisma.agendamento.findMany({
      include: {
        utente: true,
        colaborador: true,
        servico: true,
      },
    });
  }

  @Mutation(() => Agendamento)
  async createAgendamento(
    @Args('createAgendamentoInput')
    createAgendamentoInput: CreateAgendamentoInput,
  ): Promise<Agendamento> {
    return this.prisma.agendamento.create({
      data: {
        data_agendamento: new Date(
          createAgendamentoInput.data_agendamento,
        ).toISOString(),
        hora_inicio: new Date(
          `${createAgendamentoInput.data_agendamento}T${createAgendamentoInput.hora_inicio}:00`,
        ).toISOString(),
        hora_fim: createAgendamentoInput.hora_fim
          ? new Date(
              `${createAgendamentoInput.data_agendamento}T${createAgendamentoInput.hora_fim}:00`,
            ).toISOString()
          : undefined,
        observacoes: createAgendamentoInput.observacoes ?? undefined,
        utente: {
          connect: { id: createAgendamentoInput.utenteId },
        },
        colaborador: {
          connect: { id: createAgendamentoInput.colaboradorId },
        },
        servico: {
          connect: { id: createAgendamentoInput.servicoId },
        },
        status: {
          connect: { id: createAgendamentoInput.statusId },
        },
      },
      include: {
        utente: true,
        colaborador: true,
        servico: true,
        status: true,
      },
    });
  }

  @Mutation(() => Agendamento)
  async updateAgendamento(
    @Args('updateAgendamentoInput')
    updateAgendamentoInput: UpdateAgendamentoInput,
  ): Promise<Agendamento> {
    let {
      id,
      data_agendamento,
      hora_inicio,
      hora_fim,
      observacoes,
      utenteId,
      colaboradorId,
      servicoId,
      statusId,
    } = updateAgendamentoInput;

    console.log('Valores recebidos:', {
      data_agendamento,
      hora_inicio,
      hora_fim,
    });

    // Valide e ajuste o formato de data_agendamento
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data_agendamento)) {
      try {
        data_agendamento = new Date(data_agendamento)
          .toISOString()
          .split('T')[0];
      } catch (error) {
        throw new RangeError(
          'O campo data_agendamento deve estar no formato yyyy-MM-dd.',
        );
      }
    }

    // Extraia apenas o horário de hora_inicio e hora_fim, se necessário
    const extractTime = (isoString: string): string => {
      const date = new Date(isoString);
      return date.toTimeString().split(':').slice(0, 2).join(':'); // Retorna HH:mm
    };

    hora_inicio = /^\d{2}:\d{2}$/.test(hora_inicio)
      ? hora_inicio
      : extractTime(hora_inicio);
    hora_fim =
      hora_fim && /^\d{2}:\d{2}$/.test(hora_fim)
        ? hora_fim
        : hora_fim
          ? extractTime(hora_fim)
          : undefined; // Substitua null por undefined

    console.log('Valores ajustados:', {
      data_agendamento,
      hora_inicio,
      hora_fim,
    });

    // Combine data e hora para criar strings no formato ISO-8601
    let dataHoraInicio: string;
    let dataHoraFim: string | null = null;

    try {
      dataHoraInicio = new Date(
        `${data_agendamento}T${hora_inicio}:00`,
      ).toISOString();
      if (hora_fim) {
        dataHoraFim = new Date(
          `${data_agendamento}T${hora_fim}:00`,
        ).toISOString();
      }
    } catch (error) {
      throw new RangeError(
        'Erro ao combinar data e hora. Verifique os valores fornecidos.',
      );
    }

    console.log('Valores processados:', {
      dataHoraInicio,
      dataHoraFim,
    });

    // Valide se o agendamento existe
    const agendamento = await this.prisma.agendamento.findUnique({
      where: { id },
    });

    if (!agendamento) {
      throw new NotFoundException(`Agendamento com ID ${id} não encontrado.`);
    }

    // Atualize o agendamento
    return this.prisma.agendamento.update({
      where: { id },
      data: {
        data_agendamento: new Date(data_agendamento).toISOString(),
        hora_inicio: dataHoraInicio,
        hora_fim: dataHoraFim,
        observacoes: observacoes ?? undefined,
        utente: {
          connect: { id: utenteId },
        },
        colaborador: {
          connect: { id: colaboradorId },
        },
        servico: {
          connect: { id: servicoId },
        },
        status: {
          connect: { id: statusId },
        },
      },
      include: {
        utente: true,
        colaborador: true,
        servico: true,
        status: true,
      },
    });
  }

  @Mutation(() => Agendamento)
  async removeAgendamento(@Args('id', { type: () => Int }) id: number) {
    const agendamento = await this.prisma.agendamento.findUnique({
      where: { id },
    });

    if (!agendamento) {
      throw new NotFoundException(`Agendamento com ID ${id} não encontrado.`);
    }

    return this.prisma.agendamento.delete({
      where: { id },
    });
  }
}
