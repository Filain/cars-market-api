import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CarModelEntity } from '../../../database/entities/car-model.entity';
import { CarBrandRepository } from '../../repository/services/carBrand.repository';
import { CarModelRepository } from '../../repository/services/carModel.repository';
import { BaseModelRequestDto } from '../dto/request/base-model.request.dto';
import { CreateModelRequestDto } from '../dto/request/create-model.request.dto';
import { UpdateModelRequestDto } from '../dto/request/update-model.request.dto';
import { ModelResponseDto } from '../dto/response/model.response.dto';
import { ModelListResponseDto } from '../dto/response/model-list.response.dto';
import { ModelMapper } from './model.mapper';

@Injectable()
export class ModelService {
  constructor(
    private carModelRepository: CarModelRepository,
    private carBrandRepository: CarBrandRepository,
  ) {}

  public async create(dto: BaseModelRequestDto): Promise<ModelResponseDto> {
    const isBrandExist = await this.carBrandRepository.findOneBy({
      brand: dto.brand,
    });
    if (!isBrandExist) {
      throw new ConflictException();
    }
    const isModelExist = await this.carModelRepository.findOneBy({
      model: dto.model,
    });
    if (isModelExist) {
      throw new ConflictException();
    }

    const model = { model: dto.model };

    const carModel = await this.carModelRepository.save(
      this.carModelRepository.create({
        ...model,
        brand_id: isBrandExist.id,
      }),
    );
    return carModel;
  }

  public async findAll(brand: string): Promise<ModelListResponseDto> {
    const isBrandExist = await this.carBrandRepository.findOneBy({
      brand,
    });
    if (!isBrandExist) {
      throw new ConflictException();
    }
    const id = isBrandExist.id;

    const findAllModel = await this.carModelRepository.findBy({
      brand_id: isBrandExist.id,
    });
    return ModelMapper.toListModelResponseDto(findAllModel);
  }

  public async update(
    model: string,
    dto: BaseModelRequestDto,
  ): Promise<ModelResponseDto> {
    const modelEntity = await this.carModelRepository.findOneBy({
      model: model,
    });
    if (!modelEntity) {
      throw new UnprocessableEntityException();
    }

    const isBrandExist = await this.carBrandRepository.findOneBy({
      brand: dto.brand,
    });
    if (!isBrandExist) {
      throw new ConflictException();
    }

    const brand = { brand_id: isBrandExist.id };

    return await this.carModelRepository.save({ ...modelEntity, ...brand });
  }

  public async remove(model: string) {
    await this.carModelRepository.remove(
      await this.carModelRepository.findOneBy({ model: model }),
    );
  }
}
