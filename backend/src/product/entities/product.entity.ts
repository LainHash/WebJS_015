import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  ProductId: number;

  @Column({ unique: true })
  ProductCode: string;

  @Column()
  ProductName: string;

  @Column()
  CategoryId: number;

  @Column()
  BrandId: number;

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
