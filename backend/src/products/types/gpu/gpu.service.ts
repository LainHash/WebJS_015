import { Product } from '../../entities/product.entity';
import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Gpu } from './entities/gpu.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateGpuDto } from './dto/create-gpu.dto';
import { UpdateGpuDto } from './dto/update-gpu.dto';

const categoryId = 2;

@Injectable()
export class GpuService {
  constructor(
    @Inject('GPU_REPOSITORY') private gpuRepository: Repository<Gpu>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Gpu[]> {
    const gpuList = await this.gpuRepository.find();
    return gpuList;
  }

  async findOne(id: number): Promise<Gpu> {
    const matchingGpu = await this.gpuRepository.findOne({
      where: { GpuId: id },
    });

    if (!matchingGpu)
      throw new NotFoundException(`Gpu with this ID ${id} doesn't exist!`);

    return matchingGpu;
  }

  async create(createGpuDto: CreateGpuDto) {
    return await this.gpuRepository.manager.transaction(async (manager) => {
      const createdProduct = manager.create(Product, {
        ProductCode: createGpuDto.productCode,
        ProductName: createGpuDto.productName,
        category: { CategoryId: createGpuDto.categoryId },
        brand: { BrandId: createGpuDto.brandId },
        UnitPrice: createGpuDto.unitPrice,
        UnitsInStock: createGpuDto.unitsInStock,
        Discontinued: createGpuDto.discontinued,
      });

      const savedProduct = await manager.save(createdProduct);

      const createdGpu = manager.create(Gpu, {
        Bus: createGpuDto.bus,
        Clock: createGpuDto.clock,
        Igpu: createGpuDto.igpu,
        MemorySize: createGpuDto.memorySize,
        MemoryType: createGpuDto.memoryType,
        Rop: createGpuDto.rop,
        Tmu: createGpuDto.tmu,
        UnifiedShader: createGpuDto.unifiedShader,
        product: savedProduct,
      });

      return await manager.save(createdGpu);
    });
  }

  async update(id: number, updateGpuDto: UpdateGpuDto) {
    return await this.gpuRepository.manager.transaction(async (manager) => {
      const matchingGpu = await manager.findOne(Gpu, {
        where: { GpuId: id },
        relations: ['product'],
      });

      if (!matchingGpu) {
        throw new NotFoundException(`Gpu with ID ${id} not found`);
      }

      Object.assign(matchingGpu.product, {
        ProductCode: updateGpuDto.productCode,
        ProductName: updateGpuDto.productName,
        category: { CategoryId: updateGpuDto.categoryId },
        brand: { BrandId: updateGpuDto.brandId },
        UnitPrice: updateGpuDto.unitPrice,
        UnitsInStock: updateGpuDto.unitsInStock,
        Discontinued: updateGpuDto.discontinued,
      });

      await manager.save(matchingGpu.product);

      Object.assign(matchingGpu, {
        Bus: updateGpuDto.bus,
        Clock: updateGpuDto.clock,
        Igpu: updateGpuDto.igpu,
        MemorySize: updateGpuDto.memorySize,
        MemoryType: updateGpuDto.memoryType,
        Rop: updateGpuDto.rop,
        Tmu: updateGpuDto.tmu,
        UnifiedShader: updateGpuDto.unifiedShader,
      });

      return await manager.save(matchingGpu);
    });
  }

  async remove(id: number) {
    return await this.gpuRepository.manager.transaction(async (manager) => {
      const matchingGpu = await manager.findOne(Gpu, {
        where: { GpuId: id },
        relations: ['product'],
      });

      if (!matchingGpu) {
        throw new NotFoundException(`Gpu with ID ${id} not found`);
      }

      await manager.remove(matchingGpu);
      await manager.remove(matchingGpu.product);
    });
  }

  async findOrCreateGpu(
    manager: EntityManager,
    gpuId: number,
    createGpuDto: CreateGpuDto,
  ) {
    if (gpuId) {
      const matchingGpu = await manager.findOne(Gpu, {
        where: { GpuId: gpuId },
        relations: ['product'],
      });

      if (!matchingGpu) throw new NotFoundException(`Cpu ${gpuId} not found`);
      return matchingGpu;
    }

    const createdProduct = manager.create(Product, {
      ProductCode: createGpuDto.productCode,
      ProductName: createGpuDto.productName,
      category: { CategoryId: createGpuDto.categoryId },
      brand: { BrandId: createGpuDto.brandId },
      UnitPrice: createGpuDto.unitPrice,
      UnitsInStock: createGpuDto.unitsInStock,
      Discontinued: createGpuDto.discontinued,
    });

    const savedProduct = await manager.save(createdProduct);

    const createdGpu = manager.create(Gpu, {
      Bus: createGpuDto.bus,
      Clock: createGpuDto.clock,
      Igpu: createGpuDto.igpu,
      MemorySize: createGpuDto.memorySize,
      MemoryType: createGpuDto.memoryType,
      Rop: createGpuDto.rop,
      Tmu: createGpuDto.tmu,
      UnifiedShader: createGpuDto.unifiedShader,
      product: savedProduct,
    });

    return await manager.save(createdGpu);
  }
}
