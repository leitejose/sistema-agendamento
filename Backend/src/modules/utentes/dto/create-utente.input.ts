import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUtenteInput {
  @Field()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @Field()
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty({ message: 'Telemovel é obrigatório' })
  telemovel?: string | null;

  @Field()
  @IsNotEmpty({ message: 'Morada é obrigatória' })
  morada?: string;

  @Field()
  @IsNotEmpty({ message: 'Distrito é obrigatório' })
  distrito?: string;

  @Field()
  @IsNotEmpty({ message: 'Concelho é obrigatório' })
  concelho?: string;

  @Field()
  @IsNotEmpty({ message: 'Código Postal é obrigatório' })
  codigo_postal?: string;

  @Field()
  @IsNotEmpty({ message: 'País é obrigatório' })
  pais: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty({ message: 'NIF é obrigatório' })
  nif?: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty({ message: 'SNS é obrigatório' })
  sns?: string;
}
