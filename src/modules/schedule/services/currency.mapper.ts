import { AxiosResponse } from 'axios';

import { CurrencyResponseDto } from '../dto/responce/currency.response.dto';

export class CurrencyMapper {
  public static toResponseDto(
    currencyEntity: AxiosResponse<any>,
  ): CurrencyResponseDto[] {
    const responseData = currencyEntity.data;

    // Мапимо кожен об'єкт відповіді на об'єкт типу CurrencyResponseDto
    const mappedData: CurrencyResponseDto[] = responseData.map((item: any) => ({
      ccy: item.ccy,
      base_ccy: item.base_ccy,
      buy: item.buy,
      sale: item.sale,
    }));
    return mappedData;
  }
}
