import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // Corrigir o caminho do import
import { CreateCargoInput } from './dto/create-cargo.input';
import { UpdateCargoInput } from './dto/update-cargo.input';
import { Cargo, Permissao } from '@prisma/client'; // Importando os tipos corretos gerados pelo Prisma

@Injectable()
export class CargoService {
  constructor(private prisma: PrismaService) {}

  async create(createCargoInput: CreateCargoInput): Promise<Cargo | null> {
    const { descricao, permissoesIds } = createCargoInput;

    // Cria o cargo sem permissões
    const cargo = await this.prisma.cargo.create({
      data: { descricao },
    });

    // Cria as permissões na tabela de junção
    if (permissoesIds && permissoesIds.length > 0) {
      await this.prisma.cargoPermissoes.createMany({
        data: permissoesIds.map((permissaoId: number) => ({
          cargoId: cargo.id,
          permissaoId,
        })),
        skipDuplicates: true,
      });
    }

    // Retorna o cargo com as permissões
    return this.prisma.cargo.findUnique({
      where: { id: cargo.id },
      include: { permissoes: true },
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

  async update(
    id: number,
    updateCargoInput: UpdateCargoInput,
  ): Promise<Cargo | null> {
    const { descricao, permissoesIds } = updateCargoInput;

    // Atualiza o cargo (descricao)
    const cargo = await this.prisma.cargo.update({
      where: { id },
      data: { descricao },
    });

    if (permissoesIds) {
      // Remove todas as permissões antigas
      await this.prisma.cargoPermissoes.deleteMany({
        where: { cargoId: id },
      });

      // Cria as novas permissões
      await this.prisma.cargoPermissoes.createMany({
        data: permissoesIds.map((permissaoId: number) => ({
          cargoId: id,
          permissaoId,
        })),
        skipDuplicates: true,
      });
    }

    // Retorna o cargo atualizado com as permissões
    return this.prisma.cargo.findUnique({
      where: { id },
      include: { permissoes: true },
    });
  }

  async remove(id: number): Promise<Cargo> {
    // Usando o tipo 'cargo' gerado pelo Prisma
    return this.prisma.cargo.delete({
      where: { id },
    });
  }

  async getPermissoesByCargoId(cargoId: number): Promise<Permissao[]> {
    const permissoes = await this.prisma.cargoPermissoes.findMany({
      where: { cargoId },
      include: { permissao: true },
    });
    return permissoes.map((cp) => cp.permissao) || [];
  }
}
