import { Column, Entity } from 'typeorm';

import { BaseEntity } from './models/base.entity';

@Entity('photo')
export class PhotoEntity extends BaseEntity {
  @Column({ type: 'text' })
  photo: string;

  // @Column()
  // user_id: string;
  // @ManyToOne(() => UserEntity, (entity) => entity.cars)
  // @JoinColumn({ name: 'user_id' })
  // user?: UserEntity;
}
