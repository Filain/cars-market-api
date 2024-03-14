import { CarsEntity } from '../../../database/entities/cars.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { CarsListRequestDto } from '../dto/requses/cars-list.request.dto';
import { CarsResponceDto } from '../dto/response/cars.responce.dto';
import { CarsListResponseDto } from '../dto/response/cars-list.response.dto';

export class CarsMapper {
  public static toResponseDto(carsEntity: CarsEntity): CarsResponceDto {
    return {
      brand: carsEntity.brand,
      model: carsEntity.model,
      price: carsEntity.price,
      currency: carsEntity.currency,
      description: carsEntity.description,
      created: carsEntity.created,
      updated: carsEntity.updated,

      user: carsEntity.user ? UserMapper.toResponseDto(carsEntity.user) : null,
    };
  }

  public static toListResponseDto(
    entities: CarsEntity[],
    total: number,
    query: CarsListRequestDto,
  ): CarsListResponseDto {
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
