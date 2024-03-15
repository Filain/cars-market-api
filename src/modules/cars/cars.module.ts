import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { CarsController } from './cars.controller';
import { CarsService } from './services/cars.service';

@Module({
  imports: [UserModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
