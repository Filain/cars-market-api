import { Exclude } from 'class-transformer';

import { BrandResponseDto } from '../../../brand/dto/response/brand.response.dto';

@Exclude()
export class ModelResponseDto {
  id: string;
  model: string;
  created: Date;
  updated: Date;
  brand?: BrandResponseDto;
}
