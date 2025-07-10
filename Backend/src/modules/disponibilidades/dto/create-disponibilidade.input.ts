import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateDisponibilidadeInput {
  @Field(() => Int)
  id_colaborador: number;

  @Field(() => Int)
  dia_da_semana: number;

  @Field(() => Date)
  hora_inicio: Date;

  @Field(() => Date)
  hora_fim: Date;
}
