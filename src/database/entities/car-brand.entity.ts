import { Column, Entity, OneToMany } from 'typeorm';

import { CarModelEntity } from './car-model.entity';
import { BaseEntity } from './models/base.entity';

@Entity('car-brand')
export class CarBrandEntity extends BaseEntity {
  @Column('text')
  brand: string;
  @OneToMany(() => CarModelEntity, (entity) => entity.brand)
  model: CarModelEntity[];
}
