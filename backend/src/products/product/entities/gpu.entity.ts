import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Laptop } from './laptop.entity';

@Entity('Gpus')
export class Gpu {
  @PrimaryGeneratedColumn()
  GpuId: number;

  @Column({ unique: true })
  ProductId: number;
  @OneToOne(() => Product, (product) => product.ProductId)
  @JoinColumn({ name: 'ProductId' })
  product: Product;

  @Column()
  LaptopId: number;
  @OneToMany(() => Laptop, (laptop) => laptop.LaptopId)
  @JoinColumn({ name: 'LaptopId' })
  laptop: Laptop;

  @Column()
  MemorySize: number;

  @Column()
  MemoryType: string;

  @Column()
  Clock: number;

  @Column()
  UnifiedShader: number;

  @Column()
  Tmu: number;

  @Column()
  Rop: number;

  @Column()
  Bus: number;

  @Column()
  Igpu: boolean;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;
}
