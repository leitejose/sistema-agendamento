import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Cargo } from 'src/modules/cargo/entities/cargo.entity';
import { Permissao } from 'src/modules/permissoes/entities/permissoes.entity';

@ObjectType()
export class Colaborador {
  @Field(() => Int)
  id: number;

  @Field()
  descricao: string;

  @Field()
  email: string;

  @Field()
  telemovel: string;

  @Field()
  senha: string;

  @Field(() => Cargo, { nullable: true })
  cargo?: Cargo;

  @Field(() => Permissao, { nullable: true })
  permissao?: Permissao;
}
