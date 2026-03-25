import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Brand } from './brand.entity';

@Entity('Products')
export class Product {
  @PrimaryGeneratedColumn()
  ProductId: number;

  @Column({ unique: true })
  ProductCode: string;

  @Column()
  ProductName: string;

  @Column()
  CategoryId: number;
  @ManyToOne(() => Category)
  category: Category;

  @Column()
  BrandId: number;
  @ManyToOne(() => Brand)
  brand: Brand;

  @Column()
  UnitPrice: number;

  @Column()
  UnitsInStock: number;

  @Column()
  Discontinued: boolean;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;
}
