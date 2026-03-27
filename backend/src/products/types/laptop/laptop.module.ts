import { Module } from '@nestjs/common';
import { LaptopService } from './laptop.service';
import { LaptopController } from './laptop.controller';
import { DatabaseModule } from 'src/database/database.module';
import { laptopProviders } from './laptop.providers';
import { productProviders } from 'src/products/product.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [LaptopController],
  providers: [...laptopProviders, ...productProviders, LaptopService],
})
export class LaptopModule {}
