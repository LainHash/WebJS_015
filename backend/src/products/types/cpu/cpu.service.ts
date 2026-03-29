import { Product } from '../../entities/product.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository, EntityManager } from 'typeorm';
import { Cpu } from './entities/cpu.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCpuDto } from './dto/create-cpu.dto';
import { UpdateCpuDto } from './dto/update-cpu.dto';

@Injectable()
export class CpuService {
  constructor(
    @Inject('CPU_REPOSITORY') private cpuRepository: Repository<Cpu>,
  ) {}

  async findAll() {
    const cpuList = await this.cpuRepository.find({ relations: ['product'] });
    return cpuList;
  }

  async findOne(id: number): Promise<Cpu> {
    const matchingCpu = await this.cpuRepository.findOne({
      where: { CpuId: id },
      relations: ['product'],
    });

    if (!matchingCpu) {
      throw new NotFoundException(`Cpu with this ID ${id} doesn't exist!`);
    }

    if (matchingCpu.IsDeleted) {
      throw new NotFoundException(`Cpu with this ID ${id} was deleted!`);
    }

    return matchingCpu;
  }

  async create(createCpuDto: CreateCpuDto) {
    return await this.cpuRepository.manager.transaction(async (manager) => {
      const createdProduct = manager.create(Product, {
        ProductCode: createCpuDto.productCode,
        ProductName: createCpuDto.productName,
        category: { CategoryId: createCpuDto.categoryId },
        brand: { BrandId: createCpuDto.brandId },
        UnitPrice: createCpuDto.unitPrice,
        UnitsInStock: createCpuDto.unitsInStock,
        Discontinued: createCpuDto.discontinued,
      });

      const savedProduct = await manager.save(createdProduct);

      const createdCpu = manager.create(Cpu, {
        Cores: createCpuDto.cores,
        Logicals: createCpuDto.logicals,
        Tdp: createCpuDto.tdp,
        Socket: createCpuDto.socket,
        Speed: createCpuDto.speed,
        Turbo: createCpuDto.turbo,
        product: savedProduct,
      });

      return await manager.save(createdCpu);
    });
  }

  async update(id: number, updateCpuDto: UpdateCpuDto) {
    return await this.cpuRepository.manager.transaction(async (manager) => {
      const matchingCpu = await manager.findOne(Cpu, {
        where: { CpuId: id },
        relations: ['product'],
      });

      if (!matchingCpu) {
        throw new NotFoundException(`CPU with ID ${id} not found`);
      }

      Object.assign(matchingCpu.product, {
        ProductCode: updateCpuDto.productCode,
        ProductName: updateCpuDto.productName,
        category: { CategoryId: updateCpuDto.categoryId },
        brand: { BrandId: updateCpuDto.brandId },
        UnitPrice: updateCpuDto.unitPrice,
        UnitsInStock: updateCpuDto.unitsInStock,
        Discontinued: updateCpuDto.discontinued,
      });

      await manager.save(matchingCpu.product);

      Object.assign(matchingCpu, {
        Cores: updateCpuDto.cores,
        Logicals: updateCpuDto.logicals,
        Tdp: updateCpuDto.tdp,
        Socket: updateCpuDto.socket,
        Speed: updateCpuDto.speed,
        Turbo: updateCpuDto.turbo,
      });

      return await manager.save(matchingCpu);
    });
  }

  async remove(id: number) {
    return await this.cpuRepository.manager.transaction(async (manager) => {
      const matchingCpu = await manager.findOne(Cpu, {
        where: { CpuId: id },
        relations: ['product'],
      });

      if (!matchingCpu) {
        throw new NotFoundException(`CPU with ID ${id} not found`);
      }

      await manager.remove(matchingCpu);
      await manager.remove(matchingCpu.product);
    });
  }

  async findOrCreateCpu(
    manager: EntityManager,
    cpuId: number,
    createCpuDto: CreateCpuDto,
  ) {
    if (cpuId) {
      const matchingCpu = await manager.findOne(Cpu, {
        where: { CpuId: cpuId },
        relations: ['product'],
      });

      if (!matchingCpu) throw new NotFoundException(`Cpu ${cpuId} not found`);
      if (matchingCpu.IsDeleted) {
        throw new Error(`Gpu with ID ${cpuId} was deleted!`);
      }
      return matchingCpu;
    }

    const createdProduct = manager.create(Product, {
      ProductCode: createCpuDto.productCode,
      ProductName: createCpuDto.productName,
      category: { CategoryId: createCpuDto.categoryId },
      brand: { BrandId: createCpuDto.brandId },
      UnitPrice: createCpuDto.unitPrice,
      UnitsInStock: createCpuDto.unitsInStock,
      Discontinued: createCpuDto.discontinued,
    });

    const savedProduct = await manager.save(createdProduct);

    const createdCpu = manager.create(Cpu, {
      Cores: createCpuDto.cores,
      Logicals: createCpuDto.logicals,
      Tdp: createCpuDto.tdp,
      Socket: createCpuDto.socket,
      Speed: createCpuDto.speed,
      Turbo: createCpuDto.turbo,
      product: savedProduct,
    });

    return await manager.save(createdCpu);
  }
}
