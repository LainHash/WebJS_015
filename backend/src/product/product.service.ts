import { Injectable, NotFoundException } from '@nestjs/common';
import { randomInt } from 'crypto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  private products = [
    {
      id: 1,
      code: '1',
      name: 'p1',
    },
    {
      id: 2,
      code: '2',
      name: 'p2',
    },
    {
      id: 3,
      code: '3',
      name: 'p3',
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number) {
    const matchingProduct = this.products.find((product) => product.id === id);

    if (!matchingProduct)
      throw new Error(`Product with this ID ${id} doesn't exist!`);

    return matchingProduct;
  }

  create(createProductDto: CreateProductDto) {
    const createdProduct = {
      id: randomInt(10),
      ...createProductDto,
    };

    this.products.push(createdProduct);

    return createdProduct;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const matchingProduct = this.products.find(
      (existingProduct) => existingProduct.id === id,
    );

    if (!matchingProduct) {
      throw new NotFoundException(`Product with this ID ${id} doesn't exist!`);
    }

    matchingProduct.code = updateProductDto.code;
    matchingProduct.name = updateProductDto.name;

    return matchingProduct;
  }

  remove(id: number): void {
    const matchingProductIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (matchingProductIndex === -1) {
      throw new NotFoundException(`Product with this ID ${id} doesn't exist!`);
    }
    this.products.splice(matchingProductIndex, 1);
  }
}
