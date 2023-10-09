import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Anniversary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  detail: string;

  @Column({ type: 'date' })
  date: string;

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
