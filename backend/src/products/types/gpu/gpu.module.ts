import { Module } from '@nestjs/common';
import { GpuService } from './gpu.service';
import { GpuController } from './gpu.controller';
import { DatabaseModule } from 'src/database/database.module';
import { gpuProviders } from './gpu.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...gpuProviders, GpuService],
  controllers: [GpuController],
})
export class GpuModule {}
