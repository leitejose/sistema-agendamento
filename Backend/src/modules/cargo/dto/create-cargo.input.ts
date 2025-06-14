import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCargoInput {
  @Field()
  descricao: string;

  @Field(() => [Int])
  permissoesIds: number[];
}
