import { Repository } from 'typeorm';
import { Servico } from '../entities/servico.entity';

export class ServicoRepository extends Repository<Servico> {
  async findAllServicos(): Promise<Servico[]> {
    return this.find();
  }
}
