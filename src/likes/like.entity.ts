import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Entity('like')
export class Like {
  @PrimaryGeneratedColumn({ name: 'id_like' })
  id: number;

  @Column({ name: 'id_user' })
  idUser: number;

  @Column({ name: 'id_post' })
  idPost: number;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Post, (post) => post.likes)
  @JoinColumn({ name: 'id_post' })
  post: Post;
}
