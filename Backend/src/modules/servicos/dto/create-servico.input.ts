import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateServicoInput {
  @Field()
  descricao: string;

  @Field(() => Float)
  valor: number;

  @Field()
  duracao: number;
}
