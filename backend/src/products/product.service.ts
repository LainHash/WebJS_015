import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const matchingProduct = await this.productRepository.findOne({
      where: { ProductId: id },
    });

    if (!matchingProduct)
      throw new NotFoundException(`Product with this ID ${id} doesn't exist!`);

    return matchingProduct;
  }

  async create(createProductDto: CreateProductDto) {
    const createdProduct = this.productRepository.create({
      ProductCode: createProductDto.code,
      ProductName: createProductDto.name,
      category: { CategoryId: createProductDto.categoryId },
      brand: { BrandId: createProductDto.brandId },
      UnitPrice: createProductDto.unitPrice,
      UnitsInStock: createProductDto.unitsInStock,
      Discontinued: createProductDto.discontinued,
    });

    await this.productRepository.save(createdProduct);

    return createdProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const matchingProduct = await this.productRepository.findOne({
      where: { ProductId: id },
    });

    if (!matchingProduct) {
      throw new NotFoundException(`Product with this ID ${id} doesn't exist!`);
    }

    Object.assign(matchingProduct, {
      ProductName: updateProductDto.name,
      category: { CategoryId: updateProductDto.categoryId },
      brand: { BrandId: updateProductDto.brandId },
      UnitPrice: updateProductDto.unitPrice,
      UnitsInStock: updateProductDto.unitsInStock,
      Discontinued: updateProductDto.discontinued,
    });

    await this.productRepository.save(matchingProduct);

    return await this.productRepository.findOne({
      where: { ProductId: id },
    });
  }

  async remove(id: number): Promise<void> {
    const matchingProduct = await this.productRepository.findOne({
      where: { ProductId: id },
    });

    if (!matchingProduct) {
      throw new NotFoundException(`Product with this ID ${id} doesn't exist!`);
    }

    await this.productRepository.delete({ ProductId: id });
  }
}
