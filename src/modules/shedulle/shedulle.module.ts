import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CurrencyRepository } from '../repository/services/currency.repository';
import { BankRequestService } from './services/bankRequest.service';
import { ShedulleService } from './services/shedulle.service';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [ShedulleService, CurrencyRepository, BankRequestService],
  exports: [ShedulleService],
})
export class ShedulleModule {}
