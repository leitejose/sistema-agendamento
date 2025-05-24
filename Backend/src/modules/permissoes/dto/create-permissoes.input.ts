import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePermissoesInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode estar vazia' })
  descricao: string;
}
