import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('picture')
export class Picture {
  @PrimaryGeneratedColumn({ name: 'id_picture' })
  id: number;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'url' })
  url: string;
}
