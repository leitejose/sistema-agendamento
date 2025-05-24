import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DisponibilidadesService } from './disponibilidades.service';
import { Disponibilidade } from './entities/disponibilidade.entity';
import { CreateDisponibilidadeInput } from './dto/create-disponibilidade.input';
import { UpdateDisponibilidadeInput } from './dto/update-disponibilidade.input';

@Resolver(() => Disponibilidade)
export class DisponibilidadesResolver {
  constructor(private readonly disponibilidadesService: DisponibilidadesService) {}

  @Mutation(() => Disponibilidade)
  createDisponibilidade(@Args('createDisponibilidadeInput') createDisponibilidadeInput: CreateDisponibilidadeInput) {
    return this.disponibilidadesService.create(createDisponibilidadeInput);
  }

  @Query(() => [Disponibilidade], { name: 'disponibilidades' })
  findAll() {
    return this.disponibilidadesService.findAll();
  }

  @Query(() => Disponibilidade, { name: 'disponibilidade' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.disponibilidadesService.findOne(id);
  }

  @Mutation(() => Disponibilidade)
  updateDisponibilidade(@Args('updateDisponibilidadeInput') updateDisponibilidadeInput: UpdateDisponibilidadeInput) {
    return this.disponibilidadesService.update(updateDisponibilidadeInput.id, updateDisponibilidadeInput);
  }

  @Mutation(() => Disponibilidade)
  removeDisponibilidade(@Args('id', { type: () => Int }) id: number) {
    return this.disponibilidadesService.remove(id);
  }
}
