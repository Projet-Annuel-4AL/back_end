import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Post } from '../../post.entity';
import { Collab } from '../../../collab/collab.entity';

@Entity('code')
export class Code {
  @PrimaryGeneratedColumn({ name: 'id_code' })
  id: number;

  @Column({ name: 'language' })
  language: string;

  @Column({ name: 'content' })
  content: string;

  @OneToOne(() => Post, (post) => post.code)
  post: Post;

  @OneToOne(() => Collab, (collab) => collab.code)
  collab: Collab;
}
