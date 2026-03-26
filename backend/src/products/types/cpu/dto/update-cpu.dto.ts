import { IsString, IsPositive, IsBoolean } from 'class-validator';

export class UpdateCpuDto {
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
  cores: number;
  @IsPositive()
  logicals: number;
  @IsPositive()
  tdp: number;
  @IsString()
  socket: string;
  @IsPositive()
  speed: number;
  @IsPositive()
  turbo: number;
}
