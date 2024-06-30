import { Repository, FindOneOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import { Agendamento } from '../entities/agendamento.entity';
import { CreateAgendamentoDto } from '../dto/agendamento/create-agendamento.dto';
import { UpdateAgendamentoDto } from '../dto/agendamento/update-agendamento.dto';

export class AgendamentoRepository extends Repository<Agendamento> {
  constructor(dataSource: DataSource) {
    super(Agendamento, dataSource.createEntityManager());
  }

  async findAllAgendamentos(): Promise<Agendamento[]> {
    return this.find();
  }

  async createAgendamento(
    createAgendamentoDto: CreateAgendamentoDto,
  ): Promise<Agendamento> {
    const { data, hora, servico } = createAgendamentoDto;
    const agendamento = this.create({
      data,
      hora,
      servico,
    });
    await this.save(agendamento);
    return agendamento;
  }

  async updateAgendamento(
    id: number,
    updateAgendamentoDto: UpdateAgendamentoDto,
  ): Promise<Agendamento> {
    const { data, hora, servico } = updateAgendamentoDto;
    const options: FindOneOptions<Agendamento> = {
      where: { id },
    };
    const agendamento = await this.findOneOrFail(options);

    if (data !== undefined) {
      agendamento.data = data;
    }
    if (hora !== undefined) {
      agendamento.hora = hora;
    }
    if (servico !== undefined) {
      agendamento.servico = servico;
    }

    await this.save(agendamento);
    return agendamento;
  }

  async deleteAgendamento(id: number): Promise<void> {
    await this.delete(id);
  }
}
