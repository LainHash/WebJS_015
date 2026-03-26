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
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  findAll() {
    const categoryList = this.categoryService.findAll();
    return categoryList;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const category = this.categoryService.findOne(id);
      return category;
    } catch {
      throw new NotFoundException();
    }
  }

  @Post()
  create(@Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto) {
    const createdCategory = this.categoryService.create(createCategoryDto);
    return createdCategory;
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const updatedCategory = this.categoryService.update(id, updateCategoryDto);
    return updatedCategory;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    const removedCategory = this.categoryService.remove(id);
    return removedCategory;
  }
}
