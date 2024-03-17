import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { AdvertisementListRequestDto } from '../../advisement/dto/requses/advertisement-list.request.dto';
import { IUserData } from '../../auth/interfaces/user-data.interface';

@Injectable()
export class AdvertisementRepository extends Repository<AdvertisementEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdvertisementEntity, dataSource.manager);
  }
  public async findAll(
    query: AdvertisementListRequestDto,
  ): Promise<[AdvertisementEntity[], number]> {
    const qb = this.createQueryBuilder('cars');
    // qb.leftJoinAndSelect('article.likes', 'like', 'like.user_id = :myId');
    // qb.leftJoinAndSelect('article.user', 'user');
    // qb.leftJoinAndSelect('article.tags', 'tag');
    // qb.leftJoinAndSelect(
    //   'user.followings',
    //   'follow',
    //   'follow.follower_id = :myId',
    // );

    // qb.groupBy('id');

    qb.addOrderBy('advisement.created', 'DESC');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
  public async findAllMyAadvertisement(
    query: AdvertisementListRequestDto,
    userData: IUserData,
  ): Promise<[AdvertisementEntity[], number]> {
    const qb = this.createQueryBuilder('advertisement');
    qb.andWhere('user_id=:my', { my: userData.userId });

    qb.addOrderBy('advertisement.created', 'DESC');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
