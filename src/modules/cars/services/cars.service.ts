import { Injectable } from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarsRepository } from '../../repository/services/cars.repository';
import { CarsListRequestDto } from '../dto/requses/cars-list.request.dto';
import { CreateCarRequestDto } from '../dto/requses/create-car.request.dto';
import { UpdateCarRequestDto } from '../dto/requses/update-car.request.dto';
import { CarsListResponseDto } from '../dto/response/cars-list.response.dto';
import { CarsMapper } from './cars.mapper';

@Injectable()
export class CarsService {
  constructor(private readonly carsRepository: CarsRepository) {}
  public async create(dto: CreateCarRequestDto, userData: IUserData) {
    // const priceToString = dto.price.toString();
    const carsEntity = await this.carsRepository.save(
      this.carsRepository.create({
        ...dto,
        // price: priceToString,
        user_id: userData.userId,
      }),
    );
    return carsEntity;
  }

  public async findAll(
    query: CarsListRequestDto,
  ): Promise<CarsListResponseDto> {
    const [entities, total] = await this.carsRepository.findAll(query);

    return CarsMapper.toListResponseDto(entities, total, query);
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarRequestDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
