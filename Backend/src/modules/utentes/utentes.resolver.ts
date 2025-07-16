// utentes.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PrismaService } from '../../../prisma/prisma.service';
import { utente } from '@prisma/client';
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
  async utentes(): Promise<utente[]> {
    return this.prisma.utente.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        telemovel: true,
        morada: true,
        concelho: true,
        distrito: true,
        pais: true,
        codigo_postal: true,
        nif: true,
        sns: true,
      },
    });
  }

  @Mutation(() => UtenteModel)
  async updateUtente(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUtenteInput') updateUtenteInput: UpdateUtenteInput,
  ): Promise<utente> {
    const prismaData = {
      ...updateUtenteInput,
      telemovel: updateUtenteInput.telemovel ?? undefined,
    };

    return this.prisma.utente.update({
      where: { id },
      data: prismaData,
    });
  }

  @Mutation(() => UtenteModel)
  async createUtente(
    @Args('data') createUtenteInput: CreateUtenteInput,
  ): Promise<utente> {
    return this.utentesService.create(createUtenteInput);
  }

  @Mutation(() => UtenteModel)
  async removeUtente(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<utente> {
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
