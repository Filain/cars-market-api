import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { AdvertisementListRequestDto } from '../../advertisement/dto/requses/advertisement-list.request.dto';
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
