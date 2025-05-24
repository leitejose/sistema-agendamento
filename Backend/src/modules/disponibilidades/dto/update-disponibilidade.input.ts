import { CreateDisponibilidadeInput } from './create-disponibilidade.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDisponibilidadeInput extends PartialType(CreateDisponibilidadeInput) {
  @Field(() => Int)
  id: number;
}
