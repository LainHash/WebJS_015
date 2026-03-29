import { Module } from '@nestjs/common';
import { LaptopService } from './laptop.service';
import { LaptopController } from './laptop.controller';
import { DatabaseModule } from 'src/database/database.module';
import { laptopProviders } from './laptop.providers';
import { productProviders } from 'src/products/product.providers';
import { CpuService } from '../cpu/cpu.service';
import { GpuService } from '../gpu/gpu.service';
import { cpuProviders } from '../cpu/cpu.providers';
import { gpuProviders } from '../gpu/gpu.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [LaptopController],
  providers: [
    ...laptopProviders,
    ...cpuProviders,
    ...gpuProviders,
    ...productProviders,
    LaptopService,
    CpuService,
    GpuService,
  ],
})
export class LaptopModule {}
