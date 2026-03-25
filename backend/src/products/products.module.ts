import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { productProviders } from './products.providers';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ...productProviders],
})
export class ProductModule {}
