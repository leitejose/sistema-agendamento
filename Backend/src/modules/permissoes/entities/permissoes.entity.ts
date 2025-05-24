import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity('permissao') // Define a tabela no banco de dados
export class Permissao {
  @Field(() => Int)
  @PrimaryGeneratedColumn() // Define a chave primária
  id: number;

  @Field()
  @Column() // Define uma coluna no banco de dados
  descricao: string;
}
