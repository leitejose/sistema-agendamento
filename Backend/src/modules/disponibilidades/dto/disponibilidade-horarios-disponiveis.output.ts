import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DisponibilidadeHorariosDisponiveisOutput {
  @Field(() => [String])
  horarios: string[];

  @Field({ nullable: true })
  mensagem?: string;
}
