import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LaptopService } from './laptop.service';
import { CreateLaptopDto } from './dto/create-laptop.dto';
import { UpdateLaptopDto } from './dto/update-laptop.dto';

@Controller('laptops')
export class LaptopController {
  constructor(private laptopService: LaptopService) {}

  @Get()
  findAll() {
    return this.laptopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.laptopService.findOne(id);
  }

  @Post()
  create(@Body() createLaptopDto: CreateLaptopDto) {
    return this.laptopService.create(createLaptopDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLaptopDto: UpdateLaptopDto) {
    return this.laptopService.update(id, updateLaptopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.laptopService.remove(id);
  }
}
