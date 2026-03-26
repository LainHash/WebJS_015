import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CpuService } from './cpu.service';
import { NotFoundException, ValidationPipe } from '@nestjs/common';
import { CreateCpuDto } from './dto/create-cpu.dto';
import { UpdateCpuDto } from './dto/update-cpu.dto';

@Controller('cpus')
export class CpuController {
  constructor(private cpuService: CpuService) {}

  @Get()
  findAll() {
    const cpuList = this.cpuService.findAll();
    return cpuList;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const cpu = this.cpuService.findOne(id);
      return cpu;
    } catch {
      throw new NotFoundException();
    }
  }

  @Post()
  create(@Body(new ValidationPipe()) createCpuDto: CreateCpuDto) {
    const createdCpu = this.cpuService.create(createCpuDto);
    return createdCpu;
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCpuDto: UpdateCpuDto,
  ) {
    const updatedCpu = this.cpuService.update(id, updateCpuDto);
    return updatedCpu;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    const removedCpu = this.cpuService.remove(id);
    return removedCpu;
  }
}
