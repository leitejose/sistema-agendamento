import { Injectable } from '@nestjs/common';
import { CreateAgendamentoInput } from './dto/create-agendamento.input';
import { UpdateAgendamentoInput } from './dto/update-agendamento.input';

@Injectable()
export class AgendamentosService {
  create(createAgendamentoInput: CreateAgendamentoInput) {
    return 'This action adds a new agendamento';
  }

  findAll() {
    return `This action returns all agendamentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agendamento`;
  }

  update(id: number, updateAgendamentoInput: UpdateAgendamentoInput) {
    return `This action updates a #${id} agendamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} agendamento`;
  }
}
