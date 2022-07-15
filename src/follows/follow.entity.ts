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

  @ManyToOne(() => User, (user) => user.followed, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_user_followed' })
  followedUser: User;

  @ManyToOne(() => User, (user) => user.following, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_user_following' })
  followingUser: User;
}
