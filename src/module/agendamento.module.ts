import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendamentoService } from '../service/agendamento.service';
import { AgendamentoController } from '../controller/agendamento.controller';
import { AgendamentoRepository } from '../users/repositories/agendamento.repository';
import { Agendamento } from 'src/users/entities/agendamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamento])],
  providers: [
    AgendamentoService,
    {
      provide: 'AgendamentoRepository',
      useFactory: (dataSource: DataSource) =>
        new AgendamentoRepository(dataSource),
      inject: [DataSource],
    },
  ],
  controllers: [AgendamentoController],
})
export class AgendamentoModule {}
