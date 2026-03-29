import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Product } from '../../../entities/product.entity';
import { Laptop } from '../../laptop/entities/laptop.entity';

@Entity('Gpus')
export class Gpu {
  @PrimaryGeneratedColumn()
  GpuId: number;

  @Column()
  ProductId: number;
  @OneToOne(() => Product)
  @JoinColumn({ name: 'ProductId' })
  product: Product;

  @OneToMany(() => Laptop, (laptop) => laptop.LaptopId)
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
  Bus: string;

  @Column()
  Igpu: boolean;

  @Column({ default: false })
  IsDeleted: boolean;

  @DeleteDateColumn()
  DeletedAt: Date;

  @CreateDateColumn()
  CreatedAt: Date;

  @UpdateDateColumn()
  UpdatedAt: Date;
}
