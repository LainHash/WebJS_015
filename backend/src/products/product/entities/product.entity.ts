import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Brand } from 'src/products/brand/entities/brand.entity';

@Entity('Products')
export class Product {
  @PrimaryGeneratedColumn()
  ProductId: number;

  @Column({ unique: true })
  ProductCode: string;

  @Column()
  ProductName: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'CategoryId' })
  category: Category;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'BrandId' })
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
