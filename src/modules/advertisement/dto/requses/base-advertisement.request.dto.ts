import { IsString } from 'class-validator';

export class BaseAdvertisementRequestDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsString()
  price: string;

  // @IsInt()
  // price: number;

  @IsString()
  currency: string;

  @IsString()
  description: string;

  @IsString()
  created: string;

  @IsString()
  updated: string;
}
