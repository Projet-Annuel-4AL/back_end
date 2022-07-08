import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity';
import { Like } from '../likes/like.entity';
import { Remark } from '../remarks/remark.entity';
import { Follow } from '../follows/follow.entity';
import { RelationGroupUser } from '../relation-group-user/relation-group-user.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id_user' })
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'mail' })
  mail: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'id_address' })
  idAddress: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToMany(() => Remark, (remark) => remark.user)
  remarks: Remark[];

  @OneToMany(() => Follow, (follow) => follow.idUserFollowed)
  followed: Follow[];

  @OneToMany(() => Follow, (follow) => follow.idUserFollowing)
  following: Follow[];

  @OneToMany(() => RelationGroupUser, (relation) => relation.user)
  relations: RelationGroupUser[];
}
