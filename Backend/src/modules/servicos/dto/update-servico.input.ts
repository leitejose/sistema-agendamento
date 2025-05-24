import { InputType, Field, PartialType, Float } from '@nestjs/graphql';
import { CreateServicoInput } from './create-servico.input';

@InputType()
export class UpdateServicoInput extends PartialType(CreateServicoInput) {
  @Field({ nullable: true })
  descricao?: string;

  @Field(() => Float, { nullable: true })
  valor?: number;

  @Field({ nullable: true })
  duracao?: number;
}
