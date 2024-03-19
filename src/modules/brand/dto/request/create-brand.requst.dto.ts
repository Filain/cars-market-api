import { IsString } from 'class-validator';

export class CreateBrandRequstDto {
  @IsString()
  brand: string;
}
