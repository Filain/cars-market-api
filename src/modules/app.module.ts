import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { RolesGuard } from '../common/guard/roles.guard';
import configuration from '../configs/configs';
import { AdvertisementModule } from './advertisement/advertisement.module';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { HealthModule } from './health/health.module';
import { ModelModule } from './model/model.module';
import { PostgresModule } from './postgres/postgres.module';
import { RedisModule } from './redis/redis.module';
import { RepositoryModule } from './repository/repository.module';
import { SchedulesModule } from './schedule/schedulesModule';
import { UserModule } from './user/user.module';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    PostgresModule,
    RedisModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    SchedulesModule,
    AuthModule,
    UserModule,
    AdvertisementModule,
    BrandModule,
    ModelModule,
    HealthModule,
    RepositoryModule,
  ],
})
export class AppModule {}
