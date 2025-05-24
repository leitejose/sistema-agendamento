import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Colaborador } from 'src/modules/colaboradores/entities/colaborador.entity';

@ObjectType()
@Entity('cargo')
export class Cargo {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  descricao: string;

  @Field(() => [Colaborador], { nullable: true }) // Relacionamento inverso
  @OneToMany(() => Colaborador, (colaborador) => colaborador.cargo)
  colaboradores?: Colaborador[];
}
