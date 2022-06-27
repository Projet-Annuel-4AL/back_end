import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Code } from './post-body/codes/code.entity';
import { Text } from './post-body/texts/text.entity';
import { Remark } from '../remarks/remark.entity';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn({ name: 'id_post' })
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'created_date' })
  createdDate: Date;

  @Column({ name: 'id_video' })
  idVideo: number;

  @Column({ name: 'id_picture' })
  idPicture: number;

  @OneToOne(() => Text, (text) => text.post)
  @JoinColumn({ name: 'id_text' })
  text: Text;

  @OneToOne(() => Code, (code) => code.post)
  @JoinColumn({ name: 'id_code' })
  code: Code;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => Remark, (remark) => remark.post)
  remarks: Remark[];
}
