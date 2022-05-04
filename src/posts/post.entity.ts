import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn({ name: 'id_post' })
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'date_post' })
  datePost: Date;

  @Column({ name: 'id_content' })
  idContent: number;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'content_type' })
  contentType: string;

  @OneToMany(() => User, (user) => user.id)
  idUser: number;
}
