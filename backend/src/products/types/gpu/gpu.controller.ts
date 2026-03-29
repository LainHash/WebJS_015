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
  async findAll() {
    return await this.gpuService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.gpuService.findOne(id);
  }

  @Post()
  async create(@Body(new ValidationPipe()) createGpuDto: CreateGpuDto) {
    return await this.gpuService.create(createGpuDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGpuDto: UpdateGpuDto,
  ) {
    return await this.gpuService.update(id, updateGpuDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.gpuService.remove(id);
  }
}
