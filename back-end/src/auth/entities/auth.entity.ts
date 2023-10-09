import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

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
