import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'agendamento' })
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  data: Date;

  @Column('time')
  hora: string;

  @Column()
  servico: string;

  @ManyToOne(() => User, (user) => user.id)
  @Column({ name: 'userIdId' })
  userId: number;
}
