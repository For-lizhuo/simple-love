import { Photo } from 'src/photo/entities/photo.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: true })
  privacy: boolean;

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

  @OneToMany(() => Photo, (photo) => photo.album, { cascade: true })
  photos: Photo[];
}
