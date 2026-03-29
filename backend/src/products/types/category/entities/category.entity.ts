import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { Product } from '../../../entities/product.entity';

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

  @Column({ default: false })
  IsDeleted: boolean;

  @DeleteDateColumn()
  DeletedAt: Date;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @OneToMany(() => Product, (product) => product.category.CategoryId)
  products: Product[];
}
