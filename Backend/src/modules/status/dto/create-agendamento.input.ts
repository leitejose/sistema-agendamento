import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';

@InputType()
export class CreateAgendamentoInput {
  @Field()
  @IsNotEmpty()
  data_agendamento: string;

  @Field()
  @IsNotEmpty()
  hora_inicio: string;

  @Field({ nullable: true })
  @IsOptional()
  hora_fim?: string;

  @Field(() => Int) // Alterado para number
  @IsNotEmpty()
  statusId: number;

  @Field({ nullable: true })
  @IsOptional()
  observacoes?: string;

  @Field(() => Int)
  @IsNotEmpty()
  utenteId: number;

  @Field(() => Int)
  @IsNotEmpty()
  colaboradorId: number;

  @Field(() => Int)
  @IsNotEmpty()
  servicoId: number;
}
