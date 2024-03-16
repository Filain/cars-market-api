import { Column, Entity } from 'typeorm';

import { BaseEntity } from './models/base.entity';

@Entity('currency')
export class CurrencyEntity extends BaseEntity {
  @Column('text')
  ccy: string;

  @Column('text')
  base_ccy: string;

  @Column('text')
  buy: string;

  @Column('text')
  sale: string;
}
