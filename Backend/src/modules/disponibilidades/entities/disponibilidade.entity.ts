import { Field, Int, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Disponibilidade {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  id_colaborador: number;

  @Field(() => Int)
  dia_da_semana: number;

  @Field(() => Date)
  hora_inicio: Date;

  @Field(() => Date)
  hora_fim: Date;
}
