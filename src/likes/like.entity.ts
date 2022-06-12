import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('like')
export class Like {
  @PrimaryGeneratedColumn({ name: 'id_like' })
  id: number;

  @Column({ name: 'id_user' })
  idUser: number;

  @Column({ name: 'id_post' })
  idPost: number;
}
