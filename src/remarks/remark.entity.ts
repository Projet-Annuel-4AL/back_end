import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';

@Entity('remark')
export class Remark {
  @PrimaryGeneratedColumn({ name: 'id_remark' })
  id: number;

  @ManyToOne(() => Post, (post) => post.remarks)
  @JoinColumn({ name: 'id_post' })
  post: Post;

  @Column({ name: 'id_parent_remark' })
  idParentRemark: number;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'id_user' })
  idUser: number;

  @Column({ name: 'id_post' })
  idPost: number;

  @ManyToOne(() => User, (user) => user.remarks)
  @JoinColumn({ name: 'id_user' })
  user: User;
}
