import { Module } from '@nestjs/common';
import { CpuController } from './cpu.controller';
import { CpuService } from './cpu.service';
import { cpuProviders } from './cpu.providers';
import { DatabaseModule } from 'src/database/database.module';
import { productProviders } from 'src/products/product.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CpuController],
  providers: [...cpuProviders, ...productProviders, CpuService],
})
export class CpuModule {}
