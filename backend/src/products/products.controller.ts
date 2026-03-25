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
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get()
  findAll() {
    const productList = this.productService.findAll();
    return productList;
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = this.productService.findOne(id);
      return product;
    } catch {
      throw new NotFoundException();
    }
  }
  @Post()
  create(@Body(new ValidationPipe()) createProductDto: CreateProductDto) {
    const createdProduct = this.productService.create(createProductDto);
    return createdProduct;
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = this.productService.update(id, updateProductDto);
    return updatedProduct;
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    const removedProduct = this.productService.remove(id);
    return removedProduct;
  }
}
