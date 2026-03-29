import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productProviders } from './product.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CpuModule } from './types/cpu/cpu.module';
import { GpuModule } from './types/gpu/gpu.module';
import { LaptopModule } from './types/laptop/laptop.module';
import { CpuService } from './types/cpu/cpu.service';
import { cpuProviders } from './types/cpu/cpu.providers';
import { BrandModule } from './types/brand/brand.module';
import { CategoryModule } from './types/category/category.module';
import { gpuProviders } from './types/gpu/gpu.providers';

@Module({
  imports: [
    DatabaseModule,
    CpuModule,
    GpuModule,
    LaptopModule,
    BrandModule,
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [...productProviders, ProductService],
})
export class ProductModule {}
