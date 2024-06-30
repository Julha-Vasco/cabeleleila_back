import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Agendamento } from '../users/entities/agendamento.entity';
import { CreateAgendamentoDto } from '../users/dto/agendamento/create-agendamento.dto';
import { UpdateAgendamentoDto } from '../users/dto/agendamento/update-agendamento.dto';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agendamento)
    private readonly agendamentoRepository: Repository<Agendamento>,
  ) {}

  async createAgendamento(
    createAgendamentoDto: CreateAgendamentoDto,
  ): Promise<Agendamento> {
    const agendamento = this.agendamentoRepository.create(createAgendamentoDto);
    return await this.agendamentoRepository.save(agendamento);
  }

  async findAllAgendamentos(): Promise<Agendamento[]> {
    return await this.agendamentoRepository.find();
  }

  async findOneById(id: number): Promise<Agendamento | undefined> {
    try {
      const agendamento = await this.agendamentoRepository.findOne({
        where: { id: id },
      });
      if (!agendamento) {
        throw new NotFoundException(`Agendamento de ID ${id} não encontrado.`);
      }
      return agendamento;
    } catch (error) {
      throw new NotFoundException(`Agendamento de ID ${id} não encontrado.`);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.agendamentoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Agendamento de ID ${id} não encontrado.`);
    }
  }

  async updateAgendamento(
    id: number,
    updateAgendamentoDto: UpdateAgendamentoDto,
  ): Promise<Agendamento> {
    let agendamento = await this.agendamentoRepository.findOneBy({ id: id });

    if (!agendamento) {
      throw new NotFoundException(`Agendamento de ID ${id} não encontrado.`);
    }

    if (updateAgendamentoDto.data !== undefined) {
      agendamento.data = updateAgendamentoDto.data;
    }
    if (updateAgendamentoDto.hora !== undefined) {
      agendamento.hora = updateAgendamentoDto.hora;
    }
    if (updateAgendamentoDto.servico !== undefined) {
      agendamento.servico = updateAgendamentoDto.servico;
    }

    agendamento = await this.agendamentoRepository.save(agendamento);

    return agendamento;
  }
}
