import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Post } from '../../post.entity';

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
}
