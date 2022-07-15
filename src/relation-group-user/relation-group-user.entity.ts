import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Group } from '../groups/group.entity';

@Entity('relation_group_user')
export class RelationGroupUser {
  @PrimaryGeneratedColumn({ name: 'id_relation_group_user' })
  id: number;

  @Column({ name: 'id_user' })
  idUser: number;

  @Column({ name: 'id_group' })
  idGroup: number;

  @ManyToOne(() => User, (user) => user.relationGroupUsers)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Group, (group) => group.relationGroupUsers)
  @JoinColumn({ name: 'id_group' })
  group: Group;
}
