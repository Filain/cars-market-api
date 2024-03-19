import { Exclude } from 'class-transformer';

@Exclude()
export class BrandResponseDto {
  model: string;
}
