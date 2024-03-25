import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { EStatus } from '../../modules/advertisement/enums/car-status.enum';
import { ECurrency } from '../../modules/advertisement/enums/currency.enum';
import { ERegion } from '../../modules/advertisement/enums/region.enum';
import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';
import { ViewEntity } from './view.entity';

@Entity('advertisement')
export class AdvertisementEntity extends BaseEntity {
  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  brand: string;

  @Column({ type: 'text' })
  model: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'enum', enum: ERegion, default: ERegion.UNDEFINED })
  region: ERegion;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: ECurrency, default: ECurrency.UAH })
  currency: ECurrency;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  priceFunc: number;

  @Column({ type: 'enum', enum: EStatus, default: EStatus.NOT_ACTIVE })
  isValidate: EStatus;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.advertisement)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @OneToMany(() => ViewEntity, (entity) => entity.advertisement)
  views?: ViewEntity[];

  @OneToMany(() => ViewEntity, (entity) => entity.advertisement)
  photo?: ViewEntity[];
}
