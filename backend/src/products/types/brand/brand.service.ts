import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    @Inject('BRAND_REPOSITORY')
    private brandRepository: Repository<Brand>,
  ) {}

  async findAll(): Promise<Brand[]> {
    return this.brandRepository.find();
  }

  async findOne(id: number): Promise<Brand> {
    const matchingBrand = await this.brandRepository.findOne({
      where: { BrandId: id },
    });

    if (!matchingBrand)
      throw new NotFoundException(`Brand with this ID ${id} doesn't exist!`);

    return matchingBrand;
  }

  async create(createBrandDto: CreateBrandDto) {
    const createdBrand = this.brandRepository.create({
      BrandCode: createBrandDto.code,
      BrandName: createBrandDto.name,
      Country: createBrandDto.country,
    });

    await this.brandRepository.save(createdBrand);

    return createdBrand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const matchingBrand = await this.brandRepository.findOne({
      where: { BrandId: id },
    });

    if (!matchingBrand) {
      throw new NotFoundException(`Brand with this ID ${id} doesn't exist!`);
    }

    Object.assign(matchingBrand, {
      BrandCode: updateBrandDto.code,
      BrandName: updateBrandDto.name,
      Country: updateBrandDto.country,
    });

    await this.brandRepository.save(matchingBrand);

    return await this.brandRepository.findOne({
      where: { BrandId: id },
    });
  }

  async remove(id: number): Promise<void> {
    const matchingBrand = await this.brandRepository.findOne({
      where: { BrandId: id },
    });

    if (!matchingBrand) {
      throw new NotFoundException(`Brand with this ID ${id} doesn't exist!`);
    }

    await this.brandRepository.delete({ BrandId: id });
  }
}
