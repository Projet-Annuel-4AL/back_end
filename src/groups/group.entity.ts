import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('group')
export class Group {
  @PrimaryGeneratedColumn({ name: 'id_group' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'theme' })
  theme: string;
}
