import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AdvertisementEntity } from './advertisement.entity';
import { BaseEntity } from './models/base.entity';

@Entity('photo')
export class PhotoEntity extends BaseEntity {
  @Column({ type: 'text' })
  photo: string;

  @Column()
  advertisement_id: string;
  @ManyToOne(() => AdvertisementEntity, (entity) => entity.photo)
  @JoinColumn({ name: 'advertisement_id' })
  advertisement?: AdvertisementEntity;
}
