import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('follow')
export class Follow {
  @PrimaryGeneratedColumn({ name: 'id_follow' })
  id: number;

  @Column({ name: 'id_user_following' })
  idUserFollowing: number;

  @Column({ name: 'id_user_followed' })
  idUserFollowed: number;

  @ManyToOne(() => User, (user) => user.follows)
  @JoinColumn({ name: 'id_user_followed' })
  user: User;
}
