import { CarsResponceDto } from './cars.responce.dto';

export class CarsListResponseDto {
  data: CarsResponceDto[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}
