import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('remark')
export class Remark {
  @PrimaryGeneratedColumn({ name: 'id_remark' })
  id: number;

  @Column({ name: 'id_post' })
  idPost: number;

  @Column({ name: 'id_parent_remark' })
  idParentRemark: number;

  @Column({ name: 'content' })
  content: string;
}
