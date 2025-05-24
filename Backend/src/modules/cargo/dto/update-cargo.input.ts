import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateCargoInput {
  @Field(() => Int)
  id: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'O nome do cargo não pode estar vazio' })
  descricao: string;
}
