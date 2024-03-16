import { Global, Module } from '@nestjs/common';

import { AdvisementRepository } from './services/advisement.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [AdvisementRepository, RefreshTokenRepository, UserRepository],
  exports: [AdvisementRepository, RefreshTokenRepository, UserRepository],
})
export class RepositoryModule {}
