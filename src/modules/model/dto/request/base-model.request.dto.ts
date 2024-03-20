import { IsString } from 'class-validator';

export class BaseModelRequestDto {
  @IsString()
  model: string;

  @IsString()
  brand: string;
}
