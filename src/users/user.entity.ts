import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Post } from '../posts/post.entity';
import { Like } from '../likes/like.entity';
import { Remark } from '../remarks/remark.entity';
import { Follow } from '../follows/follow.entity';
import { RelationGroupUser } from '../relation-group-user/relation-group-user.entity';
import { Exclude, Expose } from 'class-transformer';
import { Picture } from '../posts/post-body/pictures/picture.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id_user' })
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'mail', unique: true })
  mail: string;

  @Column({ name: 'password' })
  @Exclude()
  password: string;

  @Column({ name: 'current_hashed_refresh_token', nullable: true })
  currentHashedRefreshToken?: string;

  @Column({ name: 'current_hashed_refresh_token' })
  admin: boolean;

  @JoinColumn({ name: 'id_avatar' })
  @OneToOne(() => Picture, {
    eager: true,
  })
  public avatar?: Picture;

  @OneToMany(() => Post, (post) => post.user)
  @Expose()
  posts: Post[];

  @OneToMany(() => Like, (like) => like.user)
  @Expose()
  likes: Like[];

  @OneToMany(() => Remark, (remark) => remark.user)
  @Expose()
  remarks: Remark[];

  @OneToMany(() => Follow, (follow) => follow.idUserFollowed)
  @Expose()
  followed: Follow[];

  @OneToMany(() => Follow, (follow) => follow.idUserFollowing)
  @Expose()
  following: Follow[];

  @OneToMany(() => RelationGroupUser, (relation) => relation.user)
  @Expose()
  relationGroupUsers: RelationGroupUser[];
}
