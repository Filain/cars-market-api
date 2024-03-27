import { Column, Entity, OneToMany } from 'typeorm';

import { Role } from '../../common/guard/enums/role.enum';
import { EAccountTypes } from '../../modules/user/enums/account-types.enum';
import { AdvertisementEntity } from './advertisement.entity';
import { BaseEntity } from './models/base.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  name?: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  deviceId: string;

  @Column({ type: 'text', select: false })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  roles: Role;

  @Column({ type: 'enum', enum: EAccountTypes, default: EAccountTypes.BASIC })
  accountType: EAccountTypes;

  @Column({ type: 'boolean', default: false })
  blocked: boolean;

  @Column({ type: 'text', nullable: true })
  image?: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => AdvertisementEntity, (entity) => entity.user)
  advertisement?: AdvertisementEntity[];
}
