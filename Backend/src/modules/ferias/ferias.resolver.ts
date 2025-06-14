import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FeriasService } from './ferias.service';
import { Ferias } from './entities/ferias.entity';
import { CreateFeriasInput } from './dto/create-ferias.input';
import { UpdateFeriasInput } from './dto/update-ferias.input';

@Resolver(() => Ferias)
export class FeriasResolver {
  constructor(private readonly feriasService: FeriasService) {}

  @Mutation(() => Ferias)
  createFerias(@Args('data') data: CreateFeriasInput) {
    return this.feriasService.create(data);
  }

  @Query(() => [Ferias], { name: 'ferias' })
  findAll() {
    return this.feriasService.findAll();
  }

  @Query(() => Ferias, { name: 'feriasById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.feriasService.findOne(id);
  }

  @Mutation(() => Ferias)
  updateFerias(@Args('data') data: UpdateFeriasInput) {
    return this.feriasService.update(data.id, data);
  }

  @Mutation(() => Ferias)
  removeFerias(@Args('id', { type: () => Int }) id: number) {
    return this.feriasService.remove(id);
  }
}
