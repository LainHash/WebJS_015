import { Module } from '@nestjs/common';
import { GpuService } from './gpu.service';
import { GpuController } from './gpu.controller';
import { DatabaseModule } from 'src/database/database.module';
import { gpuProviders } from './gpu.providers';
import { productProviders } from 'src/products/product.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...gpuProviders, ...productProviders, GpuService],
  controllers: [GpuController],
})
export class GpuModule {}
