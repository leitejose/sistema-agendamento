import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Permissao } from '../../permissoes/entities/permissoes.entity';

@ObjectType()
export class Cargo {
  @Field(() => Int)
  id: number;

  @Field()
  descricao: string;

  @Field(() => [Permissao], { nullable: true }) // <-- Aqui!
  permissoes?: Permissao[];
}
