import { CreatePermissoesInput } from './create-permissoes.input';
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

@InputType()
export class UpdatePermissoesInput extends PartialType(CreatePermissoesInput) {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'A descrição não pode estar vazia' })
  descricao: string;
}
