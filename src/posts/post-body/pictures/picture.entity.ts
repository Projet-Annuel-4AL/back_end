import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('picture')
export class Picture {
  @PrimaryGeneratedColumn({ name: 'id_picture' })
  id: number;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'key' })
  key: string;
}
