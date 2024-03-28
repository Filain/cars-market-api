import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { AdvertisementListRequestDto } from '../dto/requses/advertisement-list.request.dto';
import { AdvertisementResponceDto } from '../dto/response/advertisement.responce.dto';
import { AdvertisementListResponseDto } from '../dto/response/advertisement-list.response.dto';
import { AdvertisementWithPrices } from '../interfaces/price.interface';

export class AdvertisementMapper {
  public static toResponseDto(
    advertisementWithPrices: AdvertisementWithPrices,
  ): AdvertisementResponceDto {
    return {
      id: advertisementWithPrices.id,
      brand: advertisementWithPrices.brand,
      model: advertisementWithPrices.model,
      price: advertisementWithPrices.price,
      currency: advertisementWithPrices.currency,
      description: advertisementWithPrices.description,
      created: advertisementWithPrices.created,
      updated: advertisementWithPrices.updated,
      isValidate: advertisementWithPrices.isValidate,
      uah: advertisementWithPrices.uah,
      eur: advertisementWithPrices.eur,
      usd: advertisementWithPrices.usd,

      user: advertisementWithPrices.user
        ? UserMapper.toResponseDto(advertisementWithPrices.user)
        : null,
    };
  }

  public static toResponseCreateDto(
    advertisementEntity: AdvertisementEntity,
  ): AdvertisementResponceDto {
    return {
      id: advertisementEntity.id,
      brand: advertisementEntity.brand,
      model: advertisementEntity.model,
      price: advertisementEntity.price,
      currency: advertisementEntity.currency,
      description: advertisementEntity.description,
      created: advertisementEntity.created,
      updated: advertisementEntity.updated,
      isValidate: advertisementEntity.isValidate,

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
      data: entities.map(this.toResponseCreateDto),
      meta: {
        limit: query.limit,
        offset: query.offset,
        total,
      },
    };
  }
}
