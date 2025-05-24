import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateColaboradorInput {
  @Field()
  descricao: string;

  @Field()
  email: string;

  @Field()
  telemovel: string;

  @Field(() => Int)
  id_cargo: number;

  @Field(() => Int)
  id_permissao: number;
}
