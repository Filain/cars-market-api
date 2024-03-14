import { Injectable } from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { CarsRepository } from '../../repository/services/cars.repository';
import { CreateCarRequestDto } from '../dto/requses/create-car.request.dto';
import { UpdateCarRequestDto } from '../dto/requses/update-car.request.dto';

@Injectable()
export class CarsService {
  constructor(private readonly carsRepository: CarsRepository) {}
  public async create(dto: CreateCarRequestDto, userData: IUserData) {
    const carsEntity = await this.carsRepository.save(
      this.carsRepository.create({
        ...dto,
        user_id: userData.userId,
      }),
    );
    return carsEntity;
  }

  findAll() {
    return `This action returns all cars`;
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
