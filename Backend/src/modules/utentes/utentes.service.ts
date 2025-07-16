import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUtenteInput } from './dto/create-utente.input';
import { utente } from '@prisma/client'; // Corrigido

@Injectable()
export class UtentesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUtenteInput: CreateUtenteInput): Promise<utente> {
    // <-- Corrija aqui!
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
        telemovel: telemovel ? telemovel.toString() : '', // Ensure telemovel is always a string
        morada,
        distrito,
        concelho,
        codigo_postal,
        pais,
        nif: createUtenteInput.nif || '', // Default to empty string if undefined
        sns: createUtenteInput.sns || '', // Default to empty string if undefined
      },
    });
  }

  // Remova a função removeUtente se a lógica estiver no resolver
}
