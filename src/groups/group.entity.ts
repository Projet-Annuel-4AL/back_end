import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RelationGroupUser } from '../relation-group-user/relation-group-user.entity';
import { RelationGroupPost } from '../relation-group-post/relation-group-post.entity';

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

  @OneToMany(() => RelationGroupUser, (relation) => relation.group)
  relationGroupUsers: RelationGroupUser[];

  @OneToMany(() => RelationGroupPost, (relation) => relation.group)
  relationGroupPosts: RelationGroupPost[];
}
