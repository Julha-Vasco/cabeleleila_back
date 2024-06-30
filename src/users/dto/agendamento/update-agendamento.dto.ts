import { IsOptional, IsDateString } from 'class-validator';

export class UpdateAgendamentoDto {
  @IsOptional()
  @IsDateString()
  data?: Date;

  @IsOptional()
  hora?: string;

  @IsOptional()
  servico?: string;
}
