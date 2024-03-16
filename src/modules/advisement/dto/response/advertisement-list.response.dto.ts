import { AdvertisementResponceDto } from './advertisement.responce.dto';

export class AdvertisementListResponseDto {
  data: AdvertisementResponceDto[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}
