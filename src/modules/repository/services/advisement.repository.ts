import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdvisementEntity } from '../../../database/entities/advisement.entity';
import { AdvertisementListRequestDto } from '../../advisement/dto/requses/advertisement-list.request.dto';
import { IUserData } from '../../auth/interfaces/user-data.interface';

@Injectable()
export class AdvisementRepository extends Repository<AdvisementEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AdvisementEntity, dataSource.manager);
  }
  public async findAll(
    query: AdvertisementListRequestDto,
  ): Promise<[AdvisementEntity[], number]> {
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
  public async findAllMyAdvisement(
    query: AdvertisementListRequestDto,
    userData: IUserData,
  ): Promise<[AdvisementEntity[], number]> {
    const qb = this.createQueryBuilder('advisement');
    qb.andWhere('user_id=:my', { my: userData.userId });

    qb.addOrderBy('advisement.created', 'DESC');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
