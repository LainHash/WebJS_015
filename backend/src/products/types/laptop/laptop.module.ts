import { Module } from '@nestjs/common';
import { LaptopService } from './laptop.service';
import { LaptopController } from './laptop.controller';

@Module({
  controllers: [LaptopController],
  providers: [LaptopService],
})
export class LaptopModule {}
