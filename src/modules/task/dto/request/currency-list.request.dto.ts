import { IsString } from 'class-validator';

export class CurrencyListRequestDto {
  @IsString()
  ccy: string;

  @IsString()
  buy: string;

  @IsString()
  sale: string;
}
