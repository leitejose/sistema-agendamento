import { Resolver, Query } from '@nestjs/graphql';
import { StatusAgendamento } from './entities/status.entity';
import { StatusAgendamentoService } from './status.service';

@Resolver(() => StatusAgendamento)
export class StatusAgendamentoResolver {
  constructor(private readonly statusService: StatusAgendamentoService) {}

  @Query(() => [StatusAgendamento], { name: 'statusAgendamentos' })
  findAll() {
    return this.statusService.findAll();
  }
}
