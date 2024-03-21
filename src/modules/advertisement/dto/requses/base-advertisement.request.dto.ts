import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator';

import { EStatus } from '../../enums/car-status.enum';
import { ECurrency } from '../../enums/currency.enum';
import { ERegion } from '../../enums/region.enum';

export class BaseAdvertisementRequestDto {
  @IsString()
  title: string;

  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsString()
  description: string;

  @IsInt()
  year: number;

  @IsEnum(ERegion)
  region: ERegion;

  @IsInt()
  price: number;

  @IsEnum(ECurrency)
  currency: ECurrency;

  @IsNumber()
  priceFunc: number;

  @IsEnum(EStatus)
  isValidate: EStatus;

  @IsInt()
  totalViews?: number;

  @IsInt()
  viewsToday?: number;

  @IsInt()
  viewsThisWeek?: number;

  @IsInt()
  viewsThisMonth?: number;

  @IsString()
  created: string;

  @IsString()
  updated: string;
}
