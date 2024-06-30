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
    userId: number,
  ): Promise<Agendamento> {
    const agendamento = this.agendamentoRepository.create({
      ...createAgendamentoDto,
      userId: userId,
    });
    return await this.agendamentoRepository.save(agendamento);
  }

  async findAllAgendamentos(userId: number): Promise<Agendamento[]> {
    return await this.agendamentoRepository
      .createQueryBuilder('agendamento')
      .innerJoinAndSelect('agendamento.userId', 'user')
      .where('agendamento.userId = :userId', { userId: userId })
      .getMany();
  }

  async findOneById(
    id: number,
    userId: number,
  ): Promise<Agendamento | undefined> {
    try {
      const agendamento = await this.agendamentoRepository.findOne({
        where: { id: id, userId: userId },
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
    userId: number,
  ): Promise<Agendamento> {
    let agendamento = await this.agendamentoRepository.findOneBy({
      id: id,
      userId: userId,
    });

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
