import { Global, Module } from '@nestjs/common';

import { AdvertisementRepository } from './services/advirtisement.repository';
import { CarBrandRepository } from './services/carBrand.repository';
import { CarModelRepository } from './services/carModel.repository';
import { CurrencyRepository } from './services/currency.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

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
  ],
  exports: [
    AdvertisementRepository,
    RefreshTokenRepository,
    UserRepository,
    CurrencyRepository,
    CarBrandRepository,
    CarModelRepository,
  ],
})
export class RepositoryModule {}
