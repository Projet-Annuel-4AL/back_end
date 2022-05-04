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

  @Column({ name: 'user_mail' })
  mail: string;

  @Column({ name: 'user_Password' })
  password: string;

  @Column({ name: 'id_address' })
  idAddress: string;

  @OneToMany(() => Post, (post) => post.idUser)
  posts: Post[];
}
