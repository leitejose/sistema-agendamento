import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServicosService } from './servicos.service';
import { CreateServicoInput } from './dto/create-servico.input';
import { UpdateServicoInput } from './dto/update-servico.input';
import { ServicoModel } from './entities/servico.model';
import { Servico } from '@prisma/client';

@Resolver(() => ServicoModel)
export class ServicosResolver {
  constructor(private readonly servicosService: ServicosService) {}

  @Mutation(() => ServicoModel)
  async createServico(
    @Args('createServicoInput') createServicoInput: CreateServicoInput,
  ): Promise<ServicoModel> {
    const servico = await this.servicosService.create(createServicoInput);
    return this.mapToServicoModel(servico);
  }

  @Query(() => [ServicoModel], { name: 'servicos' })
  async findAll(): Promise<ServicoModel[]> {
    const servicos = await this.servicosService.findAll();
    return servicos.map(this.mapToServicoModel);
  }

  @Query(() => ServicoModel, { name: 'servico' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ServicoModel> {
    const servico = await this.servicosService.findOne(id);
    if (!servico) throw new Error('Servico not found');
    return this.mapToServicoModel(servico);
  }

  @Mutation(() => ServicoModel)
  async updateServico(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateServicoInput') updateServicoInput: UpdateServicoInput,
  ): Promise<ServicoModel> {
    const servico = await this.servicosService.update(id, updateServicoInput);
    return this.mapToServicoModel(servico);
  }

  @Mutation(() => ServicoModel)
  async removeServico(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ServicoModel> {
    const servico = await this.servicosService.remove(id);
    return this.mapToServicoModel(servico);
  }

  private mapToServicoModel(servico: Servico): ServicoModel {
    return {
      id: servico.id,
      descricao: servico.descricao,
      valor: servico.valor.toNumber(),
      duracao: servico.duracao,
    };
  }
}
