import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn({ name: 'idPost' })
  id: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'datePost' })
  datePost: Date;

  @Column({ name: 'idContent' })
  idContent: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'contentType' })
  contentType: string;

  @OneToMany(() => User, (user) => user.id)
  idUser: User;
}
