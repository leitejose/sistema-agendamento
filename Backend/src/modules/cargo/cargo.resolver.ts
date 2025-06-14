import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CargoService } from './cargo.service';
import { Cargo } from './entities/cargo.entity';
import { CreateCargoInput } from './dto/create-cargo.input';
import { UpdateCargoInput } from './dto/update-cargo.input';
import { Permissao } from '../permissoes/entities/permissoes.entity';

@Resolver(() => Cargo)
export class CargoResolver {
  constructor(private readonly cargoService: CargoService) {}

  @Mutation(() => Cargo)
  createCargo(@Args('createCargoInput') createCargoInput: CreateCargoInput) {
    return this.cargoService.create(createCargoInput);
  }

  @Query(() => [Cargo], { name: 'cargos' })
  findAll() {
    return this.cargoService.findAll();
  }

  @Query(() => Cargo, { name: 'cargo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cargoService.findOne(id);
  }

  @Mutation(() => Cargo)
  removeCargo(@Args('id', { type: () => Int }) id: number) {
    return this.cargoService.remove(id);
  }

  @Mutation(() => Cargo)
  updateCargo(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateCargoInput') updateCargoInput: UpdateCargoInput,
  ) {
    return this.cargoService.update(id, updateCargoInput);
  }

  @ResolveField(() => [Permissao], { nullable: true })
  async permissoes(@Parent() cargo: Cargo) {
    return this.cargoService.getPermissoesByCargoId(cargo.id);
  }
}
