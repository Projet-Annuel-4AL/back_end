import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';

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

  @Column({ name: 'id_text' })
  idText: number;

  @Column({ name: 'id_code' })
  idCode: number;

  //@OneToMany(() => User, (user) => user.id)
  @Column({ name: 'id_user' })
  idUser: number;
}
