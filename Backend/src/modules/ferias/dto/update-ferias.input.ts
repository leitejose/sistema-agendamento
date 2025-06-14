import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateFeriasInput {
  @Field()
  descricao: string;

  @Field()
  data_inicio: Date;

  @Field()
  data_fim: Date;

  @Field(() => Int)
  colaborador_id: number;
}

@InputType()
export class UpdateFeriasInput extends PartialType(CreateFeriasInput) {
  @Field(() => Int)
  id: number;
}
