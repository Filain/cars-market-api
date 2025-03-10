import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';
import { UserListRequestDto } from '../../user/dto/request/user-list.request.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }
  public async findAll(
    query: UserListRequestDto,
  ): Promise<[UserEntity[], number]> {
    const qb = this.createQueryBuilder('user');
    qb.addOrderBy('user.created', 'DESC');

    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
