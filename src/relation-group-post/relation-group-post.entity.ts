import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from '../groups/group.entity';
import { Post } from '../posts/post.entity';

@Entity('relation_group_post')
export class RelationGroupPost {
  @PrimaryGeneratedColumn({ name: 'id_relation_group_post' })
  id: number;

  @Column({ name: 'id_post' })
  idPost: number;

  @Column({ name: 'id_group' })
  idGroup: number;

  @ManyToOne(() => Post, (post) => post.relationGroupPosts)
  @JoinColumn({ name: 'id_post' })
  post: Post;

  @ManyToOne(() => Group, (group) => group.relationGroupPosts)
  @JoinColumn({ name: 'id_group' })
  group: Group;
}
