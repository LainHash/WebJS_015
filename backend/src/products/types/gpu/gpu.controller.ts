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
import { GpuService } from './gpu.service';
import { NotFoundException, ValidationPipe } from '@nestjs/common';
import { CreateGpuDto } from './dto/create-gpu.dto';
import { UpdateGpuDto } from './dto/update-gpu.dto';

@Controller('gpus')
export class GpuController {
  constructor(private gpuService: GpuService) {}

  @Get()
  findAll() {
    const gpuList = this.gpuService.findAll();
    return gpuList;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const gpu = this.gpuService.findOne(id);
      return gpu;
    } catch {
      throw new NotFoundException();
    }
  }

  @Post()
  create(@Body(new ValidationPipe()) createGpuDto: CreateGpuDto) {
    const createdGpu = this.gpuService.create(createGpuDto);
    return createdGpu;
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGpuDto: UpdateGpuDto,
  ) {
    const updatedGpu = this.gpuService.update(id, updateGpuDto);
    return updatedGpu;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    const removedGpu = this.gpuService.remove(id);
    return removedGpu;
  }
}
