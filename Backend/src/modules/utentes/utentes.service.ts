import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUtenteInput } from './dto/create-utente.input';
import { Utente } from '@prisma/client';

@Injectable()
export class UtentesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUtenteInput: CreateUtenteInput): Promise<Utente> {
    const {
      nome,
      email,
      telemovel,
      morada,
      distrito,
      concelho,
      codigo_postal,
      pais,
    } = createUtenteInput;

    // Validação para garantir que todos campos obrigatórios estão presentes
    if (
      !nome ||
      !email ||
      !telemovel ||
      !morada ||
      !distrito ||
      !concelho ||
      !codigo_postal ||
      !pais
    ) {
      throw new BadRequestException('Todos os campos são obrigatórios.');
    }

    return this.prisma.utente.create({
      data: {
        nome,
        email,
        telemovel: telemovel ? telemovel.toString() : null, // Converte para string ou null
        morada,
        distrito,
        concelho,
        codigo_postal,
        pais,
      },
    });
  }

  // Remova a função removeUtente se a lógica estiver no resolver
}
