import { IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(10)
  code: string;

  name: string;
}
