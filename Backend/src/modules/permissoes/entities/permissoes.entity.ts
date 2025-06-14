import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Cargo } from 'src/modules/cargo/entities/cargo.entity';

@ObjectType()
export class Permissao {
  @Field(() => Int)
  id: number;

  @Field()
  descricao: string;

  @Field(() => [Cargo], { nullable: true })
  cargos?: Cargo[];
}
