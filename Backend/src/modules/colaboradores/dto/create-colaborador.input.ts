import { InputType, Field, Int } from '@nestjs/graphql';

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
  cargoId: number;

  @Field({ nullable: true })
  imagem_url?: string;

  @Field()
  cor: string;
}
