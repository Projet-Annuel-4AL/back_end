import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('code')
export class Code {
  @PrimaryGeneratedColumn({ name: 'id_code' })
  id: number;

  @Column({ name: 'language' })
  language: string;

  @Column({ name: 'content' })
  content: string;
}
