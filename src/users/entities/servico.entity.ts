import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'servicos' })
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  servico: string;
}
