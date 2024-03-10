import { Global, Module } from '@nestjs/common';

import { CarsRepository } from './services/cars.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [CarsRepository, RefreshTokenRepository, UserRepository],
  exports: [CarsRepository, RefreshTokenRepository, UserRepository],
})
export class RepositoryModule {}
