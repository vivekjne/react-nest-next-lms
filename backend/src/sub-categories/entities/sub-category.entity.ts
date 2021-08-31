import { Category } from '../../categories/entities/category.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SubCategory {
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

  @ManyToOne(() => Category, (category) => category.subCategories, {
    eager: true,
  })
  category: Category;

  @Column()
  categoryId: number;

  @BeforeUpdate()
  updateTimestamp() {
    this.updated = new Date();
  }
}
