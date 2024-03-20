import { CarBrandEntity } from '../../../database/entities/car-brand.entity';
import { BrandResponseDto } from '../dto/response/brand.response.dto';
import { BrandListResponseDto } from '../dto/response/brand-list.response.dto';

export class BrandMapper {
  public static toResponseCreateDto(
    carBrandEntity: CarBrandEntity,
  ): BrandResponseDto {
    return {
      brand: carBrandEntity.brand,
      id: carBrandEntity.id,
      created: carBrandEntity.created,
      updated: carBrandEntity.updated,
    };
  }
  public static toListlResponseDto(
    entities: CarBrandEntity[],
  ): BrandListResponseDto {
    return {
      data: entities.map(this.toResponseCreateDto),
    };
  }
}
