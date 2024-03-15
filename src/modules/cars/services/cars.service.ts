import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Role } from '../../../common/guard/enums/role.enum';
import { CarsEntity } from '../../../database/entities/cars.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarsRepository } from '../../repository/services/cars.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { CarsListRequestDto } from '../dto/requses/cars-list.request.dto';
import { CreateCarRequestDto } from '../dto/requses/create-car.request.dto';
import { UpdateCarRequestDto } from '../dto/requses/update-car.request.dto';
import { CarsResponceDto } from '../dto/response/cars.responce.dto';
import { CarsListResponseDto } from '../dto/response/cars-list.response.dto';
import { CarsMapper } from './cars.mapper';

@Injectable()
export class CarsService {
  constructor(
    private readonly carsRepository: CarsRepository,
    private userRepository: UserRepository,
  ) {}
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
    return CarsMapper.toResponseDto(entity);
  }

  public async update(
    carId: string,
    dto: UpdateCarRequestDto,
    userData: IUserData,
  ) {
    const car = await this.findMyOneByIdOrThrow(carId, userData);
    //const car = await this.findMyOneByIdOrThrow(carId, userData.userId);

    const newCar = await this.carsRepository.save({
      ...car,
      ...dto,
    });
    return CarsMapper.toResponseDto(newCar);
  }

  public async remove(carId: string, userData: IUserData) {
    const car = await this.findMyOneByIdOrThrow(carId, userData);
    await this.carsRepository.remove(car);
  }

  private async findMyOneByIdOrThrow(
    carId: string,
    // userId: string,
    userData: IUserData,
  ): Promise<CarsEntity> {
    const car = await this.carsRepository.findOneBy({
      id: carId,
    });
    const user = await this.userRepository.findOneBy({
      id: userData.userId,
    });

    if (!car) {
      throw new UnprocessableEntityException();
    }
    if (
      user.roles === Role.Admin ||
      car.user_id === userData.userId ||
      user.roles === Role.Manager
    ) {
      return car;
    }
    throw new ForbiddenException();
  }
  public async findMyCars(
    query: CarsListRequestDto,
    userData: IUserData,
  ): Promise<CarsListResponseDto> {
    const [entities, total] = await this.carsRepository.findAllMyCars(
      query,
      userData,
    );
    return CarsMapper.toListResponseDto(entities, total, query);
  }
}
