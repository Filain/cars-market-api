import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';

export interface AdvertisementWithPrices extends AdvertisementEntity {
  uah: number;
  eur: number;
  usd: number;
}
