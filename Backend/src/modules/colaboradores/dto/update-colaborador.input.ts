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
  cargoId: number; // Padronize conforme o frontend

  @Field({ nullable: true })
  imagem_url?: string;

  @Field()
  cor: string;
}
