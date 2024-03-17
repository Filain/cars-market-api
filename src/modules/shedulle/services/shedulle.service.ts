import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { BankRequestService } from './bankRequest.service';

@Injectable()
export class ShedulleService {
  constructor(private readonly bankRequestService: BankRequestService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron(): Promise<void> {
    Logger.log('Updated exchange rates have been launched');
    await this.bankRequestService.getAndSave();
  }
  //
  // public async getAndSave(): Promise<any> {
  //   const axiosResponse = await this.httpService.axiosRef.get(
  //     'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5',
  //   );
  //   const currencies = CurrencyMapper.toResponseDto(axiosResponse);
  //
  //   // Перебір отриманих від API валют
  //   for (const currency of currencies) {
  //     // Знаходимо валюту в базі даних за її кодом (ccy)
  //     const entity = await this.currencyRepository.findOneBy({
  //       ccy: currency.ccy,
  //     });
  //     console.log('entity', entity);
  //     // Якщо валюта не існує, створюємо новий запис
  //     if (!entity) {
  //       await this.currencyRepository.save(currency);
  //     } else {
  //       // Якщо валюта існує, оновлюємо її дані
  //       entity.base_ccy = currency.base_ccy;
  //       entity.buy = currency.buy;
  //       entity.sale = currency.sale;
  //       entity.updated = new Date();
  //       await this.currencyRepository.save(entity);
  //     }
  //   }
  // }
}
