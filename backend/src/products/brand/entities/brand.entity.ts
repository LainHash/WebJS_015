import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Product } from 'src/products/product/entities/product.entity';

@Entity('Brands')
export class Brand {
  @PrimaryGeneratedColumn()
  BrandId: number;

  @Column({ unique: true })
  BrandCode: string;

  @Column({ unique: true })
  BrandName: string;

  @Column()
  Country: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @OneToMany(() => Product, (product) => product.brand.BrandId)
  products: Product[];
}
