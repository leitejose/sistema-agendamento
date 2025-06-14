import { ObjectType, Field } from '@nestjs/graphql';
import { Colaborador } from 'src/modules/colaboradores/entities/colaborador.entity';

@ObjectType()
export class AuthPayload {
  @Field()
  token: string;

  @Field(() => Colaborador)
  colaborador: Colaborador;
}
