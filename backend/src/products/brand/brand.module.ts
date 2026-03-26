import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { brandProviders } from './brand.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BrandController],
  providers: [...brandProviders, BrandService],
})
export class BrandModule {}
