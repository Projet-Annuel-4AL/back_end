import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RelationGroupUser } from '../relation-group-user/relation-group-user.entity';
import { RelationGroupPost } from '../relation-group-post/relation-group-post.entity';
import { Collab } from '../collab/collab.entity';
import { Picture } from '../posts/post-body/pictures/picture.entity';

@Entity('group')
export class Group {
  @PrimaryGeneratedColumn({ name: 'id_group' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'theme' })
  theme: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'id_group_owner' })
  idGroupOwner: number;

  @JoinColumn({ name: 'id_picture' })
  @OneToOne(() => Picture, {
    eager: true,
  })
  public picture?: Picture;

  @OneToMany(() => RelationGroupUser, (relation) => relation.group)
  relationGroupUsers: RelationGroupUser[];

  @OneToMany(() => RelationGroupPost, (relation) => relation.group)
  relationGroupPosts: RelationGroupPost[];

  @OneToOne(() => Collab, (collab) => collab.group)
  collab: Collab;
}
