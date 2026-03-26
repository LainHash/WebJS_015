import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandService } from './brand.service';

@Controller('brands')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get()
  findAll() {
    const brandList = this.brandService.findAll();
    return brandList;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const brand = this.brandService.findOne(id);
      return brand;
    } catch {
      throw new NotFoundException();
    }
  }

  @Post()
  create(@Body(new ValidationPipe()) createBrandDto: CreateBrandDto) {
    const createdBrand = this.brandService.create(createBrandDto);
    return createdBrand;
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    const updatedBrand = this.brandService.update(id, updateBrandDto);
    return updatedBrand;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    const removedBrand = this.brandService.remove(id);
    return removedBrand;
  }
}
