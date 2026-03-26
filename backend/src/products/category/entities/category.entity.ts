import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity('Categories')
export class Category {
  @PrimaryGeneratedColumn()
  CategoryId: number;

  @Column({ unique: true })
  CategoryCode: string;

  @Column({ unique: true })
  CategoryName: string;

  @Column()
  Description: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @OneToMany(() => Product, (product) => product.category.CategoryId)
  products: Product[];
}
