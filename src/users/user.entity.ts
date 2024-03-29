import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id_user' })
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'mail' })
  mail: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'id_address' })
  idAddress: string;

  @OneToMany(() => Post, (post) => post.idUser)
  posts: Post[];
}
