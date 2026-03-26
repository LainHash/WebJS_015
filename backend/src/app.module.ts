import { Module } from '@nestjs/common';
import { ProductModule } from './products/product.module';
import { BrandModule } from './products/types/brand/brand.module';
import { CategoryModule } from './products/types/category/category.module';
import { CpuModule } from './products/types/cpu/cpu.module';
import { GpuModule } from './products/types/gpu/gpu.module';

@Module({
  imports: [ProductModule, BrandModule, CategoryModule, CpuModule, GpuModule],
})
export class AppModule {}
