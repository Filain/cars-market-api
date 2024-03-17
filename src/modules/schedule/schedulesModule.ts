import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CurrencyRepository } from '../repository/services/currency.repository';
import { BankRequestService } from './services/bankRequest.service';
import { SchedulesService } from './services/schedules.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [SchedulesService, CurrencyRepository, BankRequestService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
