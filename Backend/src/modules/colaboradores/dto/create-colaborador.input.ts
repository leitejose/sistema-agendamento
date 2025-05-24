import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateColaboradorInput {
  @Field(() => String)
  descricao: string;

  @Field(() => String)
  email: string;


  @Field(() => String)
  telemovel: string;

  @Field(() => String)
  senha: string;

  @Field(() => Int)
  permissaoId: number;

  @Field(() => Int)
  cargoId: number;
}
