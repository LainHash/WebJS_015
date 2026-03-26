import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const matchingCategory = await this.categoryRepository.findOne({
      where: { CategoryId: id },
    });

    if (!matchingCategory)
      throw new NotFoundException(`Category with this ID ${id} doesn't exist!`);

    return matchingCategory;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = this.categoryRepository.create({
      CategoryCode: createCategoryDto.code,
      CategoryName: createCategoryDto.name,
      Description: createCategoryDto.description,
    });

    await this.categoryRepository.save(createdCategory);

    return createdCategory;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const matchingCategory = await this.categoryRepository.findOne({
      where: { CategoryId: id },
    });

    if (!matchingCategory) {
      throw new NotFoundException(`Category with this ID ${id} doesn't exist!`);
    }

    Object.assign(matchingCategory, {
      CategoryCode: updateCategoryDto.code,
      CategoryName: updateCategoryDto.name,
      Description: updateCategoryDto.description,
    });

    await this.categoryRepository.save(matchingCategory);

    return await this.categoryRepository.findOne({
      where: { CategoryId: id },
    });
  }

  async remove(id: number): Promise<void> {
    const matchingCategory = await this.categoryRepository.findOne({
      where: { CategoryId: id },
    });

    if (!matchingCategory) {
      throw new NotFoundException(`Category with this ID ${id} doesn't exist!`);
    }

    await this.categoryRepository.delete({ CategoryId: id });
  }
}
