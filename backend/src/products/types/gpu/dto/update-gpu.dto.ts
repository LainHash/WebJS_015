import { IsString, IsPositive, IsBoolean } from 'class-validator';

export class UpdateGpuDto {
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

  @IsPositive()
  memorySize: number;
  @IsString()
  memoryType: string;
  @IsPositive()
  clock: number;
  @IsPositive()
  unifiedShader: number;
  @IsPositive()
  tmu: number;
  @IsPositive()
  rop: number;
  @IsString()
  bus: string;
  @IsBoolean()
  igpu: boolean;
}
