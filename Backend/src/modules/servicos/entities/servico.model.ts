import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class ServicoModel {
  @Field(() => Int)
  id: number;

  @Field()
  descricao: string;

  @Field(() => Float)
  valor: number;

  @Field(() => Int)
  duracao: number;
}
