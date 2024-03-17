import { Column, Entity, OneToMany } from 'typeorm';

import { Role } from '../../common/guard/enums/role.enum';
import { AdvertisementEntity } from './advertisement.entity';
import { BaseEntity } from './models/base.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column('text', { nullable: true })
  name?: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  deviceId: string;

  @Column('text', { select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  roles: Role;

  @Column('boolean', { default: false })
  account?: boolean;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens: RefreshTokenEntity[];

  @OneToMany(() => AdvertisementEntity, (entity) => entity.user)
  cars: AdvertisementEntity[];
}
