import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateAgendamentoInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  data_agendamento: string;

  @Field(() => String)
  hora_inicio: string;

  @Field(() => String, { nullable: true })
  hora_fim?: string;

  @Field(() => String, { nullable: true })
  observacoes?: string;

  @Field(() => Int)
  utenteId: number;

  @Field(() => Int)
  colaboradorId: number;

  @Field(() => Int)
  servicoId: number;

  @Field(() => Int)
  statusId: number;

  @Field(() => Int)
  @IsNotEmpty()
  statusAgendamentoId: number;
}
