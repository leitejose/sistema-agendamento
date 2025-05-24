import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissoesService } from './permissoes.service';
import { Permissao } from './entities/permissoes.entity';
import { CreatePermissoesInput } from './dto/create-permissoes.input';
import { UpdatePermissoesInput } from './dto/update-permissoes.input';

@Resolver(() => Permissao)
export class PermissoesResolver {
  constructor(private readonly permissoesService: PermissoesService) {}

  @Mutation(() => Permissao)
  createPermissoes(
    @Args('createPermissoesInput') createPermissoesInput: CreatePermissoesInput,
  ) {
    return this.permissoesService.create(createPermissoesInput);
  }

  @Query(() => [Permissao], { name: 'permissoes' })
  findAll() {
    return this.permissoesService.findAll();
  }

  @Query(() => Permissao, { name: 'permissao' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.permissoesService.findOne(id);
  }

  @Mutation(() => Permissao)
  updatePermissoes(
    @Args('id', { type: () => Int }) id: number, // Adicionando o ID como argumento separado
    @Args('updatePermissoesInput') updatePermissoesInput: UpdatePermissoesInput,
  ) {
    return this.permissoesService.update(id, updatePermissoesInput);
  }

  @Mutation(() => Permissao)
  removePermissoes(@Args('id', { type: () => Int }) id: number) {
    return this.permissoesService.remove(id);
  }
}
