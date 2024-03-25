import { Module } from '@nestjs/common';

import { AuthCacheService } from '../auth/services/auth-cache.service';
import { UserModule } from '../user/user.module';
import { AdvertisementController } from './advertisement.controller';
import { AdvertisementService } from './services/advertisement.service';

@Module({
  imports: [UserModule, AuthCacheService],
  controllers: [AdvertisementController],
  providers: [AdvertisementService],
})
export class AdvertisementModule {}
