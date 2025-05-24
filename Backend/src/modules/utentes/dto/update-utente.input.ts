import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateUtenteInput } from './create-utente.input';
@InputType()
export class UpdateUtenteInput extends PartialType(CreateUtenteInput) {
  @Field()
  nome: string;

  @Field()
  email: string;

  @Field(() => String, { nullable: true }) // Permite valores nulos
  telemovel?: string | null;

  @Field()
  morada: string;

  @Field()
  concelho: string;

  @Field()
  distrito: string;

  @Field()
  pais: string;

  @Field()
  codigo_postal: string;
}
