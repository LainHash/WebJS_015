import { Module } from '@nestjs/common';
import { ProductModule } from './products/product/product.module';
import { BrandModule } from './products/brand/brand.module';
import { CategoryModule } from './products/category/category.module';

@Module({
  imports: [ProductModule, BrandModule, CategoryModule],
})
export class AppModule {}
