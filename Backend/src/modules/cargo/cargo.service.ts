import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // Corrigir o caminho do import
import { CreateCargoInput } from './dto/create-cargo.input';
import { UpdateCargoInput } from './dto/update-cargo.input';
import { Cargo } from '@prisma/client'; // Importando o tipo correto gerado pelo Prisma

@Injectable()
export class CargoService {
  constructor(private prisma: PrismaService) {}

  async create(createCargoInput: CreateCargoInput): Promise<Cargo> {
    // Usando o tipo 'cargo' gerado pelo Prisma
    return this.prisma.cargo.create({
      data: createCargoInput,
    });
  }

  async findAll(): Promise<Cargo[]> {
    // Usando o tipo 'cargo' gerado pelo Prisma
    return this.prisma.cargo.findMany();
  }

  async findOne(id: number): Promise<Cargo | null> {
    // Usando o tipo 'cargo' gerado pelo Prisma
    return this.prisma.cargo.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateCargoInput: UpdateCargoInput): Promise<Cargo> {
    // Usando o tipo 'cargo' gerado pelo Prisma
    const cargoExists = await this.prisma.cargo.findUnique({
      where: { id },
    });

    if (!cargoExists) {
      throw new NotFoundException(`Cargo com ID ${id} não encontrado`);
    }

    return this.prisma.cargo.update({
      where: { id },
      data: updateCargoInput,
    });
  }

  async remove(id: number): Promise<Cargo> {
    // Usando o tipo 'cargo' gerado pelo Prisma
    return this.prisma.cargo.delete({
      where: { id },
    });
  }
}
