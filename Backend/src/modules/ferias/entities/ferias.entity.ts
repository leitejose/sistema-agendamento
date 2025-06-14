import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Agendamento {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  id_utente: number;

  @Field(() => Int)
  id_colaborador: number;

  @Field(() => Int)
  id_servicos: number;

  @Field()
  data_agendamento: Date;

  @Field()
  hora_inicio: Date;

  @Field(() => Date, { nullable: true })
  hora_fim?: Date | null;

  @Field(() => Int)
  statusId: number;

  @Field(() => String, { nullable: true }) // Adicionado tipo explícito para observacoes
  observacoes?: string | null;

  @Field()
  criado_em: Date;

  @Field()
  atualizado_em: Date;
}

@ObjectType()
export class Ferias {
  @Field(() => Int)
  id: number;

  @Field()
  descricao: string;

  @Field()
  data_inicio: Date;

  @Field()
  data_fim: Date;

  @Field(() => Int)
  colaborador_id: number;
}
