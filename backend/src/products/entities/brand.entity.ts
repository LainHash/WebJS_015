import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Product } from './product.entity';

@Entity('Brands')
export class Brand {
  @PrimaryGeneratedColumn()
  BrandId: number;

  @Column()
  BrandCode: string;

  @Column()
  BrandName: string;

  @Column()
  Description: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;

  @OneToMany(() => Product, (product) => product.BrandId)
  products: Product[];
}
