import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AdvertisementEntity } from './advertisement.entity';

@Entity('views')
export class ViewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  views: Date;

  @Column()
  advertisement_id: string;
  @ManyToOne(() => AdvertisementEntity, (entity) => entity.views)
  @JoinColumn({ name: 'advertisement_id' })
  advertisement?: AdvertisementEntity;
}
