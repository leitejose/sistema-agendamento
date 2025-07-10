import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ColaboradoresService } from './colaborador.service';
import { Colaborador } from './entities/colaborador.entity';
import { CreateColaboradorInput } from './dto/create-colaborador.input';
import { UpdateColaboradorInput } from './dto/update-colaborador.input';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../prisma/prisma.service';
import { Disponibilidade } from '../disponibilidades/entities/disponibilidade.entity';

@Resolver(() => Colaborador)
export class ColaboradoresResolver {
  constructor(
    private readonly colaboradoresService: ColaboradoresService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Colaborador)
  async createColaborador(
    @Args('createColaboradorInput') input: CreateColaboradorInput,
  ) {
    // input.imagem_url já vem do frontend (após upload REST)
    const hashedPassword = await bcrypt.hash(input.senha, 10);
    return this.colaboradoresService.create({
      ...input,
      senha: hashedPassword,
    });
  }

  @Query(() => [Colaborador], { name: 'colaboradores' })
  findAll() {
    return this.colaboradoresService.findAll();
  }

  @Query(() => Colaborador, { name: 'findOneColaborador' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.colaboradoresService.findOne(id);
  }

  @Mutation(() => Colaborador)
  async updateColaborador(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateColaboradorInput')
    updateColaboradorInput: UpdateColaboradorInput,
  ) {
    // input.imagem_url já vem do frontend (após upload REST)
    return this.colaboradoresService.update(id, {
      ...updateColaboradorInput,
    });
  }

  @Mutation(() => Colaborador)
  async removeColaborador(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Colaborador> {
    console.log('ID recebido para remoção:', id); // <-- Adicione esta linha

    const colaborador = await this.prisma.colaborador.findUnique({
      where: { id },
    });

    if (!colaborador) {
      throw new Error(`Colaborador com ID ${id} não encontrado.`);
    }

    await this.prisma.colaborador.delete({ where: { id } });

    return colaborador;
  }

  @Query(() => Colaborador, { name: 'meColaborador' })
  async meColaborador() {
    return this.colaboradoresService.findOne(3); // exemplo com ID fixo
  }

  @ResolveField('disponibilidades', (returns) => [Disponibilidade])
  async getDisponibilidades(@Parent() colaborador: Colaborador) {
    return this.prisma.disponibilidade.findMany({
      where: { id_colaborador: colaborador.id },
    });
  }
}
