import { IsString, IsPositive, IsBoolean, IsOptional } from 'class-validator';
import { CreateCpuDto } from '../../cpu/dto/create-cpu.dto';
import { CreateGpuDto } from '../../gpu/dto/create-gpu.dto';

export class CreateLaptopDto {
  @IsString()
  productCode: string;
  @IsString()
  productName: string;
  @IsPositive()
  categoryId: number;
  @IsPositive()
  brandId: number;
  @IsPositive()
  unitPrice: number;
  @IsPositive()
  unitsInStock: number;
  @IsBoolean()
  discontinued: boolean;

  @IsOptional()
  @IsPositive()
  cpuId: number;
  @IsOptional()
  @IsPositive()
  gpuId: number;

  @IsString()
  laptopType: string;
  @IsPositive()
  inches: number;
  @IsPositive()
  weight: number;
  @IsString()
  screenResolution: string;
  @IsPositive()
  ram: number;
  @IsPositive()
  memory: number;
  @IsString()
  opSys: string;

  @IsOptional()
  cpu: CreateCpuDto;
  @IsOptional()
  gpu: CreateGpuDto;
}
