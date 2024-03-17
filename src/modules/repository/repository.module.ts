import { Global, Module } from '@nestjs/common';

import { AdvertisementRepository } from './services/advisement.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [AdvertisementRepository, RefreshTokenRepository, UserRepository],
  exports: [AdvertisementRepository, RefreshTokenRepository, UserRepository],
})
export class RepositoryModule {}
