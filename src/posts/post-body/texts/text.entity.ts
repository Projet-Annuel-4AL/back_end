import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('text')
export class Text {
  @PrimaryGeneratedColumn({ name: 'id_text' })
  id: number;

  @Column({ name: 'content' })
  content: string;
}
