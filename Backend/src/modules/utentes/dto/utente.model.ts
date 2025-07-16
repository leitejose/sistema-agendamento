// src/modules/utentes/models/utente.model.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UtenteModel {
  @Field(() => Int)
  id: number;

  @Field()
  nome: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  telemovel?: string;

  @Field({ nullable: true })
  morada?: string;

  @Field({ nullable: true })
  concelho?: string;

  @Field({ nullable: true })
  distrito?: string;

  @Field({ nullable: true })
  pais?: string;

  @Field({ nullable: true })
  codigo_postal?: string;

  @Field({ nullable: true })
  nif?: string;

  @Field({ nullable: true })
  sns?: string;
}
