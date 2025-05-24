import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ColaboradoresService } from './colaborador.service';
import { Colaborador } from './entities/colaborador.entity';
import { CreateColaboradorInput } from './dto/create-colaborador.input';
import { UpdateColaboradorInput } from './dto/update-colaborador.input';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../prisma/prisma.service';

@Resolver(() => Colaborador)
export class ColaboradoresResolver {
  constructor(
    private readonly colaboradoresService: ColaboradoresService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Colaborador) // Altere o tipo de retorno para Colaborador
  async createColaborador(
    @Args('createColaboradorInput') input: CreateColaboradorInput,
  ) {
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
    console.log('Dados recebidos no backend:', { id, updateColaboradorInput });
    return this.colaboradoresService.update(id, updateColaboradorInput);
  }

  @Mutation(() => Colaborador)
  async removeColaborador(@Args('id') id: number): Promise<Colaborador> {
    const colaborador = await this.prisma.colaborador.findUnique({
      where: { id },
    });

    if (!colaborador) {
      throw new Error(`Colaborador com ID ${id} não encontrado.`);
    }

    await this.prisma.colaborador.delete({ where: { id } });

    return colaborador;
  }
}
