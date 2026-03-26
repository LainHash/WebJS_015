import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LaptopService } from './laptop.service';
import { CreateLaptopDto } from './dto/create-laptop.dto';
import { UpdateLaptopDto } from './dto/update-laptop.dto';

@Controller('laptop')
export class LaptopController {
  constructor(private readonly laptopService: LaptopService) {}

  @Post()
  create(@Body() createLaptopDto: CreateLaptopDto) {
    return this.laptopService.create(createLaptopDto);
  }

  @Get()
  findAll() {
    return this.laptopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.laptopService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLaptopDto: UpdateLaptopDto) {
    return this.laptopService.update(+id, updateLaptopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.laptopService.remove(+id);
  }
}
