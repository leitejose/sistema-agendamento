import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCargoInput {
  @Field()
  descricao: string;
}
