import { IsString } from 'class-validator';

export class BaseCarRequestDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsString()
  price: string;

  @IsString()
  currency: string;

  @IsString()
  description: string;
}
