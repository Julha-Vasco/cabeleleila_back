import { Controller, Get } from '@nestjs/common';
import { ServicoService } from '../service/servico.service';

@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Get()
  async findAll() {
    return this.servicoService.findAll();
  }
}
