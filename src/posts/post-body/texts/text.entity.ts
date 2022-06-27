import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Post } from '../../post.entity';

@Entity('text')
export class Text {
  @PrimaryGeneratedColumn({ name: 'id_text' })
  id: number;

  @Column({ name: 'content' })
  content: string;

  @OneToOne(() => Post, (post) => post.code)
  post: Post;
}
