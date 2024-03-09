import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from '../configs/configs';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UserModule,
    HealthModule,
  ],
})
export class AppModule {}
