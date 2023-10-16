import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BaseEntity } from 'typeorm';
import { TodoStatusEnum } from './status.enum';
import { Baseentity } from './base.enity';

@Entity('todo')
export class TodoEntity extends Baseentity {
  @PrimaryGeneratedColumn()  //page200
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.TODO
  })
  status: TodoStatusEnum;
}
