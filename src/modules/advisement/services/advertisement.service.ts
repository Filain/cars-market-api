import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Role } from '../../../common/guard/enums/role.enum';
import { AdvisementEntity } from '../../../database/entities/advisement.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { AdvisementRepository } from '../../repository/services/advisement.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { AdvertisementListRequestDto } from '../dto/requses/advertisement-list.request.dto';
import { CreateAdvertisementRequestDto } from '../dto/requses/create-advertisement.request.dto';
import { UpdateAdvertisementRequestDto } from '../dto/requses/update-advertisement.request.dto';
import { AdvertisementResponceDto } from '../dto/response/advertisement.responce.dto';
import { AdvertisementListResponseDto } from '../dto/response/advertisement-list.response.dto';
import { AdvertisementMapper } from './advertisement.mapper';

@Injectable()
export class AdvertisementService {
  constructor(
    private readonly advisementRepository: AdvisementRepository,
    private userRepository: UserRepository,
  ) {}
  public async create(dto: CreateAdvertisementRequestDto, userData: IUserData) {
    const advertisementEntity = await this.advisementRepository.save(
      this.advisementRepository.create({
        ...dto,
        // price: priceToString,
        user_id: userData.userId,
      }),
    );
    return advertisementEntity;
  }

  public async findAll(
    query: AdvertisementListRequestDto,
  ): Promise<AdvertisementListResponseDto> {
    const [entities, total] = await this.advisementRepository.findAll(query);
    return AdvertisementMapper.toListResponseDto(entities, total, query);
  }

  public async findOne(
    advertisementId: string,
  ): Promise<AdvertisementResponceDto> {
    const entity = await this.advisementRepository.findOneBy({
      id: advertisementId,
    });
    return AdvertisementMapper.toResponseDto(entity);
  }

  public async update(
    advertisementId: string,
    dto: UpdateAdvertisementRequestDto,
    userData: IUserData,
  ) {
    const advisement = await this.findMyOneByIdOrThrow(
      advertisementId,
      userData,
    );

    const newAdvertisement = await this.advisementRepository.save({
      ...advisement,
      ...dto,
    });
    return AdvertisementMapper.toResponseDto(newAdvertisement);
  }

  public async remove(advisementId: string, userData: IUserData) {
    const advisement = await this.findMyOneByIdOrThrow(advisementId, userData);
    await this.advisementRepository.remove(advisement);
  }

  private async findMyOneByIdOrThrow(
    advisementId: string,
    // userId: string,
    userData: IUserData,
  ): Promise<AdvisementEntity> {
    const advisement = await this.advisementRepository.findOneBy({
      id: advisementId,
    });
    const user = await this.userRepository.findOneBy({
      id: userData.userId,
    });

    if (!advisement) {
      throw new UnprocessableEntityException();
    }
    if (
      user.roles === Role.Admin ||
      advisement.user_id === userData.userId ||
      user.roles === Role.Manager
    ) {
      return advisement;
    }
    throw new ForbiddenException();
  }
  public async findMyAdvisement(
    query: AdvertisementListRequestDto,
    userData: IUserData,
  ): Promise<AdvertisementListResponseDto> {
    const [entities, total] =
      await this.advisementRepository.findAllMyAdvisement(query, userData);
    return AdvertisementMapper.toListResponseDto(entities, total, query);
  }
}
