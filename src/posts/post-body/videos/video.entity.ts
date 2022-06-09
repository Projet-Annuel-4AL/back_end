import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('video')
export class Video {
  @PrimaryGeneratedColumn({ name: 'id_video' })
  id: number;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'url' })
  url: string;
}
