import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Role } from '../../../common/guard/enums/role.enum';
import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { AdvertisementRepository } from '../../repository/services/advisement.repository';
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
    private readonly advertisementRepository: AdvertisementRepository,
    private userRepository: UserRepository,
  ) {}
  public async create(dto: CreateAdvertisementRequestDto, userData: IUserData) {
    const advertisementEntity = await this.advertisementRepository.save(
      this.advertisementRepository.create({
        ...dto,
        // price: priceToString,
        user_id: userData.userId,
      }),
    );
    return AdvertisementMapper.toResponseDto(advertisementEntity);
  }

  public async findAll(
    query: AdvertisementListRequestDto,
  ): Promise<AdvertisementListResponseDto> {
    const [entities, total] = await this.advertisementRepository.findAll(query);
    return AdvertisementMapper.toListResponseDto(entities, total, query);
  }

  public async findOne(
    advertisementId: string,
  ): Promise<AdvertisementResponceDto> {
    const entity = await this.advertisementRepository.findOneBy({
      id: advertisementId,
    });
    return AdvertisementMapper.toResponseDto(entity);
  }

  public async update(
    advertisementId: string,
    dto: UpdateAdvertisementRequestDto,
    userData: IUserData,
  ) {
    const advertisement = await this.findMyOneByIdOrThrow(
      advertisementId,
      userData,
    );

    const newAdvertisement = await this.advertisementRepository.save({
      ...advertisement,
      ...dto,
    });
    return AdvertisementMapper.toResponseDto(newAdvertisement);
  }

  public async remove(advertisementId: string, userData: IUserData) {
    const advertisement = await this.findMyOneByIdOrThrow(
      advertisementId,
      userData,
    );
    await this.advertisementRepository.remove(advertisement);
  }

  private async findMyOneByIdOrThrow(
    advertisementId: string,
    // userId: string,
    userData: IUserData,
  ): Promise<AdvertisementEntity> {
    const advertisement = await this.advertisementRepository.findOneBy({
      id: advertisementId,
    });
    const user = await this.userRepository.findOneBy({
      id: userData.userId,
    });

    if (!advertisement) {
      throw new UnprocessableEntityException();
    }
    if (
      user.roles === Role.Admin ||
      advertisement.user_id === userData.userId ||
      user.roles === Role.Manager
    ) {
      return advertisement;
    }
    throw new ForbiddenException();
  }
  public async findMyAdvertisement(
    query: AdvertisementListRequestDto,
    userData: IUserData,
  ): Promise<AdvertisementListResponseDto> {
    const [entities, total] =
      await this.advertisementRepository.findAllMyAadvertisement(
        query,
        userData,
      );
    return AdvertisementMapper.toListResponseDto(entities, total, query);
  }
}
