import { IsString } from 'class-validator';

export class BaseCurrencyRequestDto {
  @IsString()
  ccy: string;

  @IsString()
  base_ccy: string;

  @IsString()
  buy: string;

  @IsString()
  sale: string;
}
