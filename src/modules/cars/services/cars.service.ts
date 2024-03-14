import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { CarsEntity } from '../../../database/entities/cars.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarsRepository } from '../../repository/services/cars.repository';
import { CarsListRequestDto } from '../dto/requses/cars-list.request.dto';
import { CreateCarRequestDto } from '../dto/requses/create-car.request.dto';
import { UpdateCarRequestDto } from '../dto/requses/update-car.request.dto';
import { CarsResponceDto } from '../dto/response/cars.responce.dto';
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

  public async findOne(carId: string): Promise<CarsResponceDto> {
    const entity = await this.carsRepository.findOneBy({ id: carId });
    return entity;
  }

  public async update(
    carId: string,
    dto: UpdateCarRequestDto,
    userData: IUserData,
  ) {
    const car = await this.findMyOneByIdOrThrow(carId, userData.userId);
    const newCar = await this.carsRepository.save({
      ...car,
      ...dto,
    });
    return CarsMapper.toResponseDto(newCar);
  }

  public async remove(carId: string, userData: IUserData) {
    const car = await this.findMyOneByIdOrThrow(carId, userData.userId);
    await this.carsRepository.remove(car);
  }

  private async findMyOneByIdOrThrow(
    carId: string,
    userId: string,
  ): Promise<CarsEntity> {
    const car = await this.carsRepository.findOneBy({
      id: carId,
    });
    if (!car) {
      throw new UnprocessableEntityException();
    }
    if (car.user_id !== userId) {
      throw new ForbiddenException();
    }
    return car;
  }
}
