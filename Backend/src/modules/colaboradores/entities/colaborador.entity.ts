import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Permissao } from 'src/modules/permissoes/entities/permissoes.entity';
import { Cargo } from 'src/modules/cargo/entities/cargo.entity';

@ObjectType() // Define o tipo GraphQL
@Entity('colaborador') // Define a tabela no banco de dados
export class Colaborador {
  @Field(() => Int) // Campo GraphQL
  @PrimaryGeneratedColumn() // Chave primária no banco de dados
  id: number;

  @Field(() => String) // Campo GraphQL
  @Column() // Coluna no banco de dados
  descricao: string;

  @Field(() => String) // Campo GraphQL
  @Column({ unique: true }) // Coluna única no banco de dados
  email: string;

  @Field(() => String) // Campo GraphQL
  @Column() // Coluna no banco de dados
  telemovel: string;

  @Field(() => String) // Campo GraphQL
  @Column() // Coluna no banco de dados
  senha: string;

  @Field(() => Cargo, { nullable: true }) // Relacione com o tipo Cargo
  @ManyToOne(() => Cargo, (cargo) => cargo.colaboradores)
  cargo?: Cargo;

  @Field(() => Permissao, { nullable: true }) // Relacione com a entidade Permissao
  @ManyToOne(() => Permissao)
  permissao?: Permissao;
}
