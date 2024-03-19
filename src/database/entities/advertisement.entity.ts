import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';

@Entity('advertisement')
export class AdvertisementEntity extends BaseEntity {
  @Column('text')
  brand: string;

  @Column('text')
  model: string;

  @Column('text')
  price: number;

  @Column('text')
  currency: string;

  @Column('text', { nullable: true })
  priceFunc: string;

  @Column('text', { nullable: true })
  year: string;

  @Column('text', { nullable: true })
  region: string;

  @Column('text', { nullable: true })
  isValidate: string;

  @Column('text')
  description: string;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
