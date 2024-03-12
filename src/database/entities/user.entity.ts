import { Column, Entity, OneToMany } from 'typeorm';

import { CarsEntity } from './cars.entity';
import { BaseEntity } from './models/base.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column('text', { nullable: true })
  name?: string;

  @Column('text', { unique: true })
  email: string;

  // @Column('text')
  // deviceId: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { nullable: true })
  role?: string;

  @Column('text', { nullable: true })
  account?: boolean;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens: RefreshTokenEntity[];

  @OneToMany(() => CarsEntity, (entity) => entity.user)
  cars: CarsEntity[];
}
