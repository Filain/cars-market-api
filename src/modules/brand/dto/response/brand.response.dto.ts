import { Exclude } from 'class-transformer';

@Exclude()
export class BrandResponseDto {
  brand: string;

  id: string;

  created: Date;

  updated: Date;
}
