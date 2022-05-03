import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'idUser' })
  id: number;

  @Column({ name: 'firstName' })
  firstName: string;

  @Column({ name: 'lastName' })
  lastName: string;

  @Column({ name: 'userMail' })
  mail: string;

  @Column({ name: 'userPassword' })
  password: string;

  @Column({ name: 'idAdress' })
  idAddress: string;

  @OneToMany(() => Post, (post) => post.idUser)
  posts: Post[];
}
