import {
  IsBoolean,
  IsInt,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  code: string;
  @IsString()
  name: string;
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
}
