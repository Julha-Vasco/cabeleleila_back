import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateAgendamentoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  servico: string;

  @IsDate()
  @IsNotEmpty()
  data: Date;

  @IsString()
  @IsNotEmpty()
  hora: string;
}
