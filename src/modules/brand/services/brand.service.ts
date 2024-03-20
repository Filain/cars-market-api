import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CarBrandRepository } from '../../repository/services/carBrand.repository';
import { CreateBrandRequstDto } from '../dto/request/create-brand.requst.dto';
import { UpdateBrandRequstDto } from '../dto/request/update-brand.requst.dto';
import { BrandResponseDto } from '../dto/response/brand.response.dto';
import { BrandListResponseDto } from '../dto/response/brand-list.response.dto';
import { BrandMapper } from './brand.mapper';

@Injectable()
export class BrandService {
  constructor(private carBrandRepository: CarBrandRepository) {}
  public async create(dto: CreateBrandRequstDto): Promise<BrandResponseDto> {
    const isBrandExist = await this.carBrandRepository.findOneBy({
      brand: dto.brand,
    });
    if (isBrandExist) {
      throw new ConflictException();
    }
    const carBrand = await this.carBrandRepository.save(
      this.carBrandRepository.create({ ...dto }),
    );
    return BrandMapper.toResponseCreateDto(carBrand);
  }

  public async findAll(): Promise<BrandListResponseDto> {
    const allbrand = await this.carBrandRepository.find();
    return BrandMapper.toListlResponseDto(allbrand);
  }

  public async findOne(brand: string): Promise<BrandResponseDto> {
    const one = await this.carBrandRepository.findOneBy({ brand: brand });
    return BrandMapper.toResponseCreateDto(one);
  }

  public async update(
    brand: string,
    dto: UpdateBrandRequstDto,
  ): Promise<BrandResponseDto> {
    const brandEntity = await this.carBrandRepository.findOneBy({
      brand: brand,
    });
    if (!brandEntity) {
      throw new UnprocessableEntityException();
    }
    const one = await this.carBrandRepository.save({ ...brandEntity, ...dto });
    return BrandMapper.toResponseCreateDto(one);
  }

  public async remove(brand: string) {
    await this.carBrandRepository.remove(
      await this.carBrandRepository.findOneBy({ brand: brand }),
    );
  }
}
