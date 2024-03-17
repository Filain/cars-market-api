import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { AdvertisementListRequestDto } from '../dto/requses/advertisement-list.request.dto';
import { AdvertisementResponceDto } from '../dto/response/advertisement.responce.dto';
import { AdvertisementListResponseDto } from '../dto/response/advertisement-list.response.dto';

export class AdvertisementMapper {
  public static toResponseDto(
    advertisementEntity: AdvertisementEntity,
  ): AdvertisementResponceDto {
    return {
      brand: advertisementEntity.brand,
      model: advertisementEntity.model,
      price: advertisementEntity.price,
      currency: advertisementEntity.currency,
      description: advertisementEntity.description,
      created: advertisementEntity.created,
      updated: advertisementEntity.updated,

      user: advertisementEntity.user
        ? UserMapper.toResponseDto(advertisementEntity.user)
        : null,
    };
  }

  public static toListResponseDto(
    entities: AdvertisementEntity[],
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
