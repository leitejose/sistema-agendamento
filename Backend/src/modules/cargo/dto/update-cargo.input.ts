import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCargoInput {
  @Field({ nullable: true })
  descricao?: string;

  @Field(() => [Int], { nullable: true })
  permissoesIds?: number[];
}
