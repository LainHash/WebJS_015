import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Cpu } from './cpu.entity';
import { Gpu } from './gpu.entity';

@Entity('Laptops')
export class Laptop {
  @PrimaryGeneratedColumn()
  LaptopId: number;

  @Column({ unique: true })
  ProductId: number;
  @OneToOne(() => Product, (product) => product.ProductId)
  @JoinColumn({ name: 'ProductId' })
  product: Product;

  @Column()
  CpuId: number;
  @ManyToOne(() => Cpu, (cpu) => cpu.CpuId)
  @JoinColumn({ name: 'CpuId' })
  cpu: Cpu;

  @Column()
  GpuId: number;
  @ManyToOne(() => Gpu, (gpu) => gpu.GpuId)
  @JoinColumn({ name: 'GpuId' })
  gpu: Gpu;

  @Column()
  LaptopType: string;

  @Column()
  Inches: number;

  @Column()
  Weight: number;

  @Column()
  ScreenResolution: string;

  @Column()
  Ram: number;

  @Column()
  Memory: number;

  @Column()
  OpSys: string;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;
}
