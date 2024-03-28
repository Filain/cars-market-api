import { Global, Module } from '@nestjs/common';

import { AdvertisementRepository } from './services/advirtisement.repository';
import { CarBrandRepository } from './services/carBrand.repository';
import { CarModelRepository } from './services/carModel.repository';
import { CurrencyRepository } from './services/currency.repository';
import { PhotoRepository } from './services/photo.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';
import { ViewRepository } from './services/view.repository';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    AdvertisementRepository,
    RefreshTokenRepository,
    UserRepository,
    CurrencyRepository,
    CarBrandRepository,
    CarModelRepository,
    ViewRepository,
    PhotoRepository,
  ],
  exports: [
    AdvertisementRepository,
    RefreshTokenRepository,
    UserRepository,
    CurrencyRepository,
    CarBrandRepository,
    CarModelRepository,
    ViewRepository,
    PhotoRepository,
  ],
})
export class RepositoryModule {}
