import { CarModelEntity } from '../../../database/entities/car-model.entity';
import { BrandMapper } from '../../brand/services/brand.mapper';
import { ModelResponseDto } from '../dto/response/model.response.dto';
import { ModelListResponseDto } from '../dto/response/model-list.response.dto';

export class ModelMapper {
  public static toResponseModelCreateDto(
    carModelEntity: CarModelEntity,
  ): ModelResponseDto {
    return {
      id: carModelEntity.id,
      model: carModelEntity.model,
      created: carModelEntity.created,
      updated: carModelEntity.updated,

      brand: carModelEntity.brand
        ? BrandMapper.toResponseCreateDto(carModelEntity.brand)
        : null,
    };
  }
  public static toListModelResponseDto(
    entities: CarModelEntity[],
  ): ModelListResponseDto {
    return {
      data: entities.map(this.toResponseModelCreateDto),
    };
  }
}
