import { Injectable } from '@nestjs/common';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';

@Injectable()
@Entity('refresh-tokens')
export class RefreshTokenEntity extends BaseEntity {
  @Column('text')
  refreshToken: string;

  @Column('text')
  deviceId: string;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
