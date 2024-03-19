import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CarBrandEntity } from '../../database/entities/car-brand.entity';
import { CarBrandRepository } from '../repository/services/carBrand.repository';
import { CreateBrandRequstDto } from './dto/request/create-brand.requst.dto';
import { UpdateBrandRequstDto } from './dto/request/update-brand.requst.dto';

@Injectable()
export class BrandService {
  constructor(private carBrandRepository: CarBrandRepository) {}
  public async create(dto: CreateBrandRequstDto): Promise<CarBrandEntity> {
    const isBrandExist = await this.carBrandRepository.findOneBy({
      brand: dto.brand,
    });
    if (isBrandExist) {
      throw new ConflictException();
    }
    const carBrand = await this.carBrandRepository.save(
      this.carBrandRepository.create({ ...dto }),
    );
    return carBrand;
  }

  public async findAll(): Promise<CarBrandEntity[]> {
    return await this.carBrandRepository.find();
  }

  public async findOne(brand: string) {
    return await this.carBrandRepository.findOneBy({ brand: brand });
  }

  public async update(brand: string, dto: UpdateBrandRequstDto) {
    const brandEntity = await this.carBrandRepository.findOneBy({
      brand: brand,
    });
    if (!brandEntity) {
      throw new UnprocessableEntityException();
    }
    return await this.carBrandRepository.save({ ...brandEntity, ...dto });
  }

  public async remove(brand: string) {
    await this.carBrandRepository.remove(
      await this.carBrandRepository.findOneBy({ brand: brand }),
    );
  }
}
