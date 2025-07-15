// utentes.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PrismaService } from '../../../prisma/prisma.service';
import { Utente } from '@prisma/client'; // Corrigido
import { UtenteModel } from './dto/utente.model';
import { CreateUtenteInput } from './dto/create-utente.input';
import { UpdateUtenteInput } from './dto/update-utente.input';
import { UtentesService } from './utentes.service';

@Resolver(() => UtenteModel)
export class UtentesResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utentesService: UtentesService,
  ) {}

  @Query(() => [UtenteModel])
  async utentes(): Promise<Utente[]> {
    // <-- Corrija aqui!
    return this.prisma.utente.findMany();
  }

  @Mutation(() => UtenteModel)
  async updateUtente(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUtenteInput') updateUtenteInput: UpdateUtenteInput,
  ): Promise<Utente> {
    // <-- Corrija aqui!
    return this.prisma.utente.update({
      where: { id },
      data: updateUtenteInput,
    });
  }

  @Mutation(() => UtenteModel)
  async createUtente(
    @Args('data') createUtenteInput: CreateUtenteInput,
  ): Promise<Utente> {
    // <-- Corrija aqui!
    return this.utentesService.create(createUtenteInput);
  }

  @Mutation(() => UtenteModel)
  async removeUtente(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Utente> {
    // <-- Corrija aqui!
    try {
      const utente = await this.prisma.utente.delete({
        where: { id },
      });
      return utente;
    } catch (error) {
      console.error('Erro ao remover utente:', error);
      throw new Error('Erro ao remover utente.');
    }
  }
}
