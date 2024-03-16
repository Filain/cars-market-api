import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AdvertisementController } from './advertisement.controller';
import { AdvertisementService } from './services/advertisement.service';

@Module({
  imports: [UserModule],
  controllers: [AdvertisementController],
  providers: [AdvertisementService],
})
export class AdvertisementModule {}
