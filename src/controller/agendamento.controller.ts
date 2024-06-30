import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  Param,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AgendamentoService } from '../service/agendamento.service';
import { CreateAgendamentoDto } from 'src/users/dto/agendamento/create-agendamento.dto';
import { UpdateAgendamentoDto } from 'src/users/dto/agendamento/update-agendamento.dto';
import { Agendamento } from 'src/users/entities/agendamento.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('agendamentos')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createAgendamentoDto: CreateAgendamentoDto,
    @Request() req,
  ) {
    const userId = req.user.sub;
    return this.agendamentoService.createAgendamento(
      createAgendamentoDto,
      userId,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.agendamentoService.findAllAgendamentos(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOneById(
    @Param('id') id: string,
    @Request() req,
  ): Promise<Agendamento> {
    const agendamento = await this.agendamentoService.findOneById(
      parseInt(id, 10),
      req.user.sub,
    );
    if (!agendamento) {
      throw new NotFoundException(`Agendamento de ID ${id} não encontrado`);
    }
    return agendamento;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAgendamentoDto: UpdateAgendamentoDto,
  ): Promise<{ message: string }> {
    const updatedAgendamento = await this.agendamentoService.updateAgendamento(
      parseInt(id, 10),
      updateAgendamentoDto,
    );

    if (!updatedAgendamento) {
      throw new NotFoundException(`Agendamento de ID ${id} não encontrado`);
    }

    return { message: `Agendamento de ID ${id} atualizado com sucesso` };
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteAgendamento(
    @Param('id') id: string,
    @Request() req,
  ): Promise<{ message: string }> {
    const agendamento = await this.agendamentoService.findOneById(
      parseInt(id, 10),
      req.user.sub,
    );
    if (!agendamento) {
      throw new NotFoundException(`Agendamento de ID ${id} não encontrado`);
    }

    await this.agendamentoService.delete(parseInt(id, 10));
    return { message: `Agendamento de ID ${id} deletado com sucesso` };
  }
}
