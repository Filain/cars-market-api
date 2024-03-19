import { Column, Entity } from 'typeorm';

import { BaseEntity } from './models/base.entity';

@Entity('currency')
export class CurrencyEntity extends BaseEntity {
  @Column('text')
  ccy: string;

  @Column('text')
  base_ccy: string;

  @Column('text')
  buy: number;

  @Column('text')
  sale: number;
}
