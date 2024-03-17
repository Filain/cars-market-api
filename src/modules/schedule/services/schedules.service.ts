import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { BankRequestService } from './bankRequest.service';

@Injectable()
export class SchedulesService {
  constructor(private readonly bankRequestService: BankRequestService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron(): Promise<void> {
    Logger.log('Updated exchange rates have been launched');
    await this.bankRequestService.getAndSave();
  }
}
