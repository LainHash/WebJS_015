import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreateLaptopDto } from './dto/create-laptop.dto';
import { UpdateLaptopDto } from './dto/update-laptop.dto';
import { Repository } from 'typeorm';
import { Laptop } from './entities/laptop.entity';
import { Product } from '../../entities/product.entity';
import { Cpu } from '../cpu/entities/cpu.entity';
import { Gpu } from '../gpu/entities/gpu.entity';
import { CpuService } from '../cpu/cpu.service';
import { GpuService } from '../gpu/gpu.service';

@Injectable()
export class LaptopService {
  constructor(
    @Inject('LAPTOP_REPOSITORY') private laptopRepository: Repository<Laptop>,
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    private cpuService: CpuService,
    private gpuService: GpuService,
  ) {}

  async findAll(): Promise<Laptop[]> {
    return await this.laptopRepository.find();
  }

  async findOne(id: number) {
    const matchingLaptop = await this.laptopRepository.find({
      where: { LaptopId: id },
    });

    if (!matchingLaptop)
      throw new NotFoundException(`Laptop with ID ${id} not found`);

    return matchingLaptop;
  }

  async create(createLaptopDto: CreateLaptopDto) {
    return await this.laptopRepository.manager.transaction(async (manager) => {
      const createdProduct = manager.create(Product, {
        ProductCode: createLaptopDto.productCode,
        ProductName: createLaptopDto.productName,
        category: { CategoryId: createLaptopDto.categoryId },
        brand: { BrandId: createLaptopDto.brandId },
        UnitPrice: createLaptopDto.unitPrice,
        UnitsInStock: createLaptopDto.unitsInStock,
        Discontinued: createLaptopDto.discontinued,
      });

      const savedProduct = await manager.save(createdProduct);

      const findOrCreateCpu = await this.cpuService.findOrCreateCpu(
        manager,
        createLaptopDto.cpuId,
        createLaptopDto.cpu,
      );

      const findOrCreateGpu = await this.gpuService.findOrCreateGpu(
        manager,
        createLaptopDto.gpuId,
        createLaptopDto.gpu,
      );

      const createdLaptop = manager.create(Laptop, {
        cpu: findOrCreateCpu,
        gpu: findOrCreateGpu || null,

        Inches: createLaptopDto.inches,
        Memory: createLaptopDto.memory,
        OpSys: createLaptopDto.opSys,
        Ram: createLaptopDto.ram,
        LaptopType: createLaptopDto.laptopType,
        ScreenResolution: createLaptopDto.screenResolution,
        Weight: createLaptopDto.weight,

        product: savedProduct,
      });

      return await manager.save(createdLaptop);
    });
  }

  async update(id: number, updateLaptopDto: UpdateLaptopDto) {
    return await this.laptopRepository.manager.transaction(async (manager) => {
      const matchingLaptop = await manager.findOne(Laptop, {
        where: { LaptopId: id },
        relations: ['product', 'cpu', 'gpu'],
      });

      if (!matchingLaptop)
        throw new NotFoundException(`Laptop with ID ${id} not found`);

      Object.assign(matchingLaptop.product, {
        ProductCode: updateLaptopDto.productCode,
        ProductName: updateLaptopDto.productName,
        category: { CategoryId: updateLaptopDto.categoryId },
        brand: { BrandId: updateLaptopDto.brandId },
        UnitPrice: updateLaptopDto.unitPrice,
        UnitsInStock: updateLaptopDto.unitsInStock,
        Discontinued: updateLaptopDto.discontinued,
      });

      await manager.save(matchingLaptop.product);

      Object.assign(matchingLaptop, {
        cpu: { CpuId: updateLaptopDto.cpuId },
        gpu: { GpuId: updateLaptopDto.gpuId },

        Inches: updateLaptopDto.inches,
        Memory: updateLaptopDto.memory,
        OpSys: updateLaptopDto.opSys,
        Ram: updateLaptopDto.ram,
        LaptopType: updateLaptopDto.laptopType,
        ScreenResolution: updateLaptopDto.screenResolution,
        Weight: updateLaptopDto.weight,
      });

      return await manager.save(matchingLaptop);
    });
  }

  async remove(id: number) {
    return await this.laptopRepository.manager.transaction(async (manager) => {
      const matchingLaptop = await manager.findOne(Laptop, {
        where: { LaptopId: id },
        relations: ['product'],
      });

      if (!matchingLaptop) {
        throw new NotFoundException(`Laptop with ID ${id} not found`);
      }

      await manager.remove(matchingLaptop);
      await manager.remove(matchingLaptop.product);
    });
  }
}
