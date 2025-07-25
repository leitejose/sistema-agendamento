import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Cargo } from 'src/modules/cargo/entities/cargo.entity';
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

  @Field(() => String, { nullable: true })
  imagem_url?: string | null;

  @Field(() => String)
  cor: string | null;
}
