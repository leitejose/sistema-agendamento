import { Injectable } from '@nestjs/common';
import { CreateDisponibilidadeInput } from './dto/create-disponibilidade.input';
import { UpdateDisponibilidadeInput } from './dto/update-disponibilidade.input';

@Injectable()
export class DisponibilidadesService {
  create(createDisponibilidadeInput: CreateDisponibilidadeInput) {
    return 'This action adds a new disponibilidade';
  }

  findAll() {
    return `This action returns all disponibilidades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} disponibilidade`;
  }

  update(id: number, updateDisponibilidadeInput: UpdateDisponibilidadeInput) {
    return `This action updates a #${id} disponibilidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} disponibilidade`;
  }
}
