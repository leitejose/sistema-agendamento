import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CargoService } from './cargo.service';
import { Cargo } from './entities/cargo.entity';
import { CreateCargoInput } from './dto/create-cargo.input';

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
}
