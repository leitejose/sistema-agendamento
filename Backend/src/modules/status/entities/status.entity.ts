import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class StatusAgendamento {
  @Field(() => Int)
  id: number;

  @Field()
  descricao: string;

  @Field()
  cor: string;
}