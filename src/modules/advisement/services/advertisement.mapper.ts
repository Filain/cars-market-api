import { AdvisementEntity } from '../../../database/entities/advisement.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { AdvertisementListRequestDto } from '../dto/requses/advertisement-list.request.dto';
import { AdvertisementResponceDto } from '../dto/response/advertisement.responce.dto';
import { AdvertisementListResponseDto } from '../dto/response/advertisement-list.response.dto';

export class AdvertisementMapper {
  public static toResponseDto(
    advisementEntity: AdvisementEntity,
  ): AdvertisementResponceDto {
    return {
      brand: advisementEntity.brand,
      model: advisementEntity.model,
      price: advisementEntity.price,
      currency: advisementEntity.currency,
      description: advisementEntity.description,
      created: advisementEntity.created,
      updated: advisementEntity.updated,

      user: advisementEntity.user
        ? UserMapper.toResponseDto(advisementEntity.user)
        : null,
    };
  }

  public static toListResponseDto(
    entities: AdvisementEntity[],
    total: number,
    query: AdvertisementListRequestDto,
  ): AdvertisementListResponseDto {
    return {
      data: entities.map(this.toResponseDto),
      meta: {
        limit: query.limit,
        offset: query.offset,
        total,
      },
    };
  }
}
