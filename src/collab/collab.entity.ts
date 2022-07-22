import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from '../groups/group.entity';
import { Code } from '../posts/post-body/codes/code.entity';

@Entity('collab')
export class Collab {
  @PrimaryGeneratedColumn({ name: 'id_collab' })
  id: number;

  @Column({ name: 'id_group' })
  idGroup: number;

  @Column({ name: 'id_code' })
  IdCode: number;

  @OneToOne(() => Group, (group) => group.collab, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_group' })
  group: Group;

  @OneToOne(() => Code, (code) => code.collab, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_code' })
  code: Code;
}
