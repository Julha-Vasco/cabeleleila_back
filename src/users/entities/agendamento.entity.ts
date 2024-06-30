import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'agendamento' })
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('date')
  data: Date;

  @Column('time')
  hora: string;

  @Column()
  servico: string;
}
