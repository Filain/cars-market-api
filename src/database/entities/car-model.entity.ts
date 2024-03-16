import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { CarBrandEntity } from './car-brand.entity';
import { BaseEntity } from './models/base.entity';

@Entity('car-model')
export class CarModelEntity extends BaseEntity {
  @Column('text')
  model: string;
  @Column()
  brand_id: string;
  @ManyToOne(() => CarBrandEntity, (entity) => entity.model)
  @JoinColumn({ name: 'brand_id' })
  brand?: CarBrandEntity;
}
