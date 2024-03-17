import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';

@Injectable()
export class TasksService {
  constructor(private readonly httpService: HttpService) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    Logger.log('Currency exchange rates updated');
    const response = await this.findAll();
    Logger.log(response.data);
  }

  async findAll(): Promise<AxiosResponse<any>> {
    return await this.httpService.axiosRef.get(
      'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5',
    );
  }
}
