import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarsEntity } from '../../../database/entities/cars.entity';
import { CarsListRequestDto } from '../../cars/dto/requses/cars-list.request.dto';

@Injectable()
export class CarsRepository extends Repository<CarsEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarsEntity, dataSource.manager);
  }
  public async findAll(
    query: CarsListRequestDto,
  ): Promise<[CarsEntity[], number]> {
    const qb = this.createQueryBuilder('cars');
    // qb.leftJoinAndSelect('article.likes', 'like', 'like.user_id = :myId');
    // qb.leftJoinAndSelect('article.user', 'user');
    // qb.leftJoinAndSelect('article.tags', 'tag');
    // qb.leftJoinAndSelect(
    //   'user.followings',
    //   'follow',
    //   'follow.follower_id = :myId',
    // );

    qb.addOrderBy('cars.created', 'DESC');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
