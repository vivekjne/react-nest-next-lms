import slugify from 'slugify';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ default: '' })
  image: string;

  @Column({ default: '' })
  slug: string;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }
}
