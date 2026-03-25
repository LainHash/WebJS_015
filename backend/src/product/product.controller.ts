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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interface';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  async findAll(): Promise<Product[]> {
    const productList = this.productService.findAll();
    return productList;
  }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    try {
      const product = this.productService.findOne(id);
      return product;
    } catch {
      throw new NotFoundException();
    }
  }
  @Post()
  async create(@Body(new ValidationPipe()) createProductDto: CreateProductDto) {
    const createdProduct = this.productService.create(createProductDto);
    return createdProduct;
  }
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = this.productService.update(id, updateProductDto);
    return updatedProduct;
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const removedProduct = this.productService.remove(id);
    return removedProduct;
  }
}
