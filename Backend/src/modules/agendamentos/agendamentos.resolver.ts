import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PrismaService } from '../../../prisma/prisma.service';
import { Agendamento } from './entities/agendamento.entity';
import { CreateAgendamentoInput } from './dto/create-agendamento.input';
import { UpdateAgendamentoInput } from './dto/update-agendamento.input';
import { NotFoundException } from '@nestjs/common';
import { toZonedTime } from 'date-fns-tz';
import { NotificationService } from '../notifications/notification.service'; // <-- importe aqui

@Resolver(() => Agendamento)
export class AgendamentosResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService, // <-- injete aqui
  ) {}

  // Cria a data no horário de Lisboa e converte para UTC para salvar corretamente
  private makeLocalDate(dateStr: string, timeStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hour, minute] = timeStr.split(':').map(Number);
    // Cria a data como se fosse no fuso de Lisboa
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute, 0, 0));
    // Converte para o fuso de Lisboa (mantendo o horário local)
    return toZonedTime(date, 'Europe/Lisbon');
  }

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
    const agendamento = await this.prisma.agendamento.create({
      data: {
        data_agendamento: this.makeLocalDate(
          createAgendamentoInput.data_agendamento,
          '00:00',
        ),
        hora_inicio: this.makeLocalDate(
          createAgendamentoInput.data_agendamento,
          createAgendamentoInput.hora_inicio,
        ),
        hora_fim: createAgendamentoInput.hora_fim
          ? this.makeLocalDate(
              createAgendamentoInput.data_agendamento,
              createAgendamentoInput.hora_fim,
            )
          : undefined,
        observacoes: createAgendamentoInput.observacoes ?? undefined,
        utente: { connect: { id: createAgendamentoInput.utenteId } },
        colaborador: { connect: { id: createAgendamentoInput.colaboradorId } },
        servico: { connect: { id: createAgendamentoInput.servicoId } },
        status_agendamento: {
          connect: { id: createAgendamentoInput.statusAgendamentoId },
        },
        atualizado_em: new Date(),
      },
      include: {
        utente: true,
        colaborador: true,
        servico: true,
        status_agendamento: true,
      },
    });

    // Envie o e-mail para o utente
    if (agendamento.utente?.email) {
      console.log('Enviando e-mail para:', agendamento.utente.email);
      await this.notificationService.sendAgendamentoCriado(
        agendamento.utente.email,
        {
          data: agendamento.data_agendamento.toLocaleDateString(),
          hora: agendamento.hora_inicio.toLocaleTimeString().slice(0, 5),
          ...agendamento,
        },
      );
      console.log('E-mail enviado!');
    }

    return agendamento;
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

    const extractTime = (isoString: string): string => {
      const date = new Date(isoString);
      return date.toTimeString().split(':').slice(0, 2).join(':'); // HH:mm
    };

    hora_inicio = /^\d{2}:\d{2}$/.test(hora_inicio)
      ? hora_inicio
      : extractTime(hora_inicio);
    hora_fim =
      hora_fim && /^\d{2}:\d{2}$/.test(hora_fim)
        ? hora_fim
        : hora_fim
          ? extractTime(hora_fim)
          : undefined;

    const agendamento = await this.prisma.agendamento.findUnique({
      where: { id },
    });

    if (!agendamento) {
      throw new NotFoundException(`Agendamento com ID ${id} não encontrado.`);
    }

    // Busque o agendamento atual antes de atualizar
    const agendamentoAtual = await this.prisma.agendamento.findUnique({
      where: { id: updateAgendamentoInput.id },
      include: {
        utente: true,
        colaborador: true,
        servico: true,
        status_agendamento: true,
      },
    });

    if (!agendamentoAtual) {
      throw new NotFoundException(
        `Agendamento com ID ${updateAgendamentoInput.id} não encontrado.`,
      );
    }

    // Atualize o agendamento
    const updatedAgendamento = await this.prisma.agendamento.update({
      where: { id: updateAgendamentoInput.id },
      data: {
        data_agendamento: this.makeLocalDate(data_agendamento, '00:00'),
        hora_inicio: this.makeLocalDate(data_agendamento, hora_inicio),
        hora_fim: hora_fim
          ? this.makeLocalDate(data_agendamento, hora_fim)
          : undefined,
        observacoes: observacoes ?? undefined,
        utente: { connect: { id: utenteId } },
        colaborador: { connect: { id: colaboradorId } },
        servico: { connect: { id: servicoId } },
        status_agendamento: {
          connect: { id: updateAgendamentoInput.statusAgendamentoId },
        },
        atualizado_em: new Date(),
      },
      include: {
        utente: true, // Inclui o objeto completo do utente
        colaborador: true, // Inclui o objeto completo do colaborador
        servico: true, // Inclui o objeto completo do serviço
        status_agendamento: true, // Inclui o objeto completo do status
      },
    });

    const normalize = (str?: string) =>
      (str ?? '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();

    const statusMudouParaCancelado =
      agendamentoAtual.statusId !== updateAgendamentoInput.statusId &&
      normalize(updatedAgendamento.status_agendamento?.descricao) ===
        'cancelado';

    const statusMudouParaConcluido =
      agendamentoAtual.statusId !== updateAgendamentoInput.statusId &&
      normalize(updatedAgendamento.status_agendamento?.descricao) ===
        'concluido';

    if (updatedAgendamento.utente?.email) {
      if (statusMudouParaCancelado) {
        await this.notificationService.sendAgendamentoCancelado(
          updatedAgendamento.utente.email,
          {
            data: updatedAgendamento.data_agendamento.toLocaleDateString(),
            hora: updatedAgendamento.hora_inicio
              .toLocaleTimeString()
              .slice(0, 5),
            ...updatedAgendamento,
          },
        );
      } else if (statusMudouParaConcluido) {
        await this.notificationService.sendAgendamentoConcluido(
          updatedAgendamento.utente.email,
          {
            data: updatedAgendamento.data_agendamento.toLocaleDateString(),
            hora: updatedAgendamento.hora_inicio
              .toLocaleTimeString()
              .slice(0, 5),
            ...updatedAgendamento,
          },
        );
      } else {
        await this.notificationService.sendAgendamentoAlterado(
          updatedAgendamento.utente.email,
          {
            data: updatedAgendamento.data_agendamento.toLocaleDateString(),
            hora: updatedAgendamento.hora_inicio
              .toLocaleTimeString()
              .slice(0, 5),
            ...updatedAgendamento,
          },
        );
      }
    }

    return updatedAgendamento;
  }

  @Mutation(() => Agendamento)
  async removeAgendamento(@Args('id', { type: () => Int }) id: number) {
    const agendamento = await this.prisma.agendamento.findUnique({
      where: { id },
      include: { utente: true },
    });

    if (!agendamento) {
      throw new NotFoundException(`Agendamento com ID ${id} não encontrado.`);
    }

    const deleted = await this.prisma.agendamento.delete({
      where: { id },
    });

    // Envie o e-mail para o utente
    if (agendamento.utente?.email) {
      await this.notificationService.sendAgendamentoCancelado(
        agendamento.utente.email,
        {
          data: agendamento.data_agendamento.toLocaleDateString(),
          hora: agendamento.hora_inicio.toLocaleTimeString().slice(0, 5),
          ...agendamento,
        },
      );
    }

    return deleted;
  }
}
