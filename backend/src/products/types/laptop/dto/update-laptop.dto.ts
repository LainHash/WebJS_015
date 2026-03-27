import { IsString, IsPositive, IsBoolean } from 'class-validator';

export class UpdateLaptopDto {
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
  cpuId: number;
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
}
