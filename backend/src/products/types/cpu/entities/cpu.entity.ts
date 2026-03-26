import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../../entities/product.entity';
import { Laptop } from '../../laptop/entities/laptop.entity';

@Entity('Cpus')
export class Cpu {
  @PrimaryGeneratedColumn()
  CpuId: number;

  @Column({ unique: true })
  ProductId: number;
  @OneToOne(() => Product, (product) => product.ProductId)
  @JoinColumn({ name: 'ProductId' })
  product: Product;

  @OneToMany(() => Laptop, (laptop) => laptop.LaptopId)
  laptop: Laptop;

  @Column()
  Cores: number;

  @Column()
  Logicals: number;

  @Column()
  Tdp: number;

  @Column()
  Socket: string;

  @Column()
  Speed: number;

  @Column()
  Turbo: number;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;
}
