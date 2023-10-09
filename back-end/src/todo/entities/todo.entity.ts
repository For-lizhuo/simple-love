import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detail: string;

  @Column({ default: false })
  complete: boolean;

  @Column({ type: 'date', nullable: true })
  completeDate: string;

  @CreateDateColumn({
    name: 'create_time',
    nullable: true,
  })
  createTime: Date;

  @DeleteDateColumn({
    name: 'delete_at',
    nullable: true,
  })
  deleteAt: Date | null;
}
