import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // Corrigir o caminho do import
import { CreateCargoInput } from './dto/create-cargo.input';
import { UpdateCargoInput } from './dto/update-cargo.input';
import { cargo, permissao } from '@prisma/client'; // Corrigido

@Injectable()
export class CargoService {
  constructor(private prisma: PrismaService) {}

  async create(createCargoInput: CreateCargoInput): Promise<cargo | null> {
    // <-- Corrija aqui!
    const { descricao, permissoesIds } = createCargoInput;

    // Cria o cargo sem permissões
    const novoCargo = await this.prisma.cargo.create({
      data: { descricao },
    });

    // Cria as permissões na tabela de junção
    if (permissoesIds && permissoesIds.length > 0) {
      await this.prisma.cargoPermissoes.createMany({
        data: permissoesIds.map((permissaoId: number) => ({
          cargoId: novoCargo.id,
          permissaoId,
        })),
        skipDuplicates: true,
      });
    }

    // Retorna o cargo com as permissões
    return this.prisma.cargo.findUnique({
      where: { id: novoCargo.id },
      include: { permissoes: true },
    });
  }

  async findAll(): Promise<cargo[]> {
    // <-- Corrija aqui!
    return this.prisma.cargo.findMany();
  }

  async findOne(id: number): Promise<cargo | null> {
    // <-- Corrija aqui!
    return this.prisma.cargo.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateCargoInput: UpdateCargoInput,
  ): Promise<cargo | null> {
    // <-- Corrija aqui!
    const { descricao, permissoesIds } = updateCargoInput;

    // Atualiza o cargo (descricao)
    const novoCargo = await this.prisma.cargo.update({
      where: { id },
      data: { descricao },
    });

    if (permissoesIds) {
      await this.prisma.cargoPermissoes.deleteMany({
        where: { cargoId: id },
      });

      await this.prisma.cargoPermissoes.createMany({
        data: permissoesIds.map((permissaoId: number) => ({
          cargoId: id,
          permissaoId,
        })),
        skipDuplicates: true,
      });
    }

    return this.prisma.cargo.findUnique({
      where: { id },
      include: { permissoes: true },
    });
  }

  async remove(id: number): Promise<cargo> {
    // <-- Corrija aqui!
    return this.prisma.cargo.delete({
      where: { id },
    });
  }

  async getPermissoesByCargoId(cargoId: number): Promise<permissao[]> {
    // <-- Corrija aqui!
    const permissoes = await this.prisma.cargoPermissoes.findMany({
      where: { cargoId },
      include: { permissao: true },
    });
    return permissoes.map((cp) => cp.permissao) || [];
  }
}
