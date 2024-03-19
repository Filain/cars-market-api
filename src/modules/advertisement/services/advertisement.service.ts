import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { isLogLevelEnabled } from '@nestjs/common/services/utils';

import { Role } from '../../../common/guard/enums/role.enum';
import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { AdvertisementRepository } from '../../repository/services/advirtisement.repository';
import { CurrencyRepository } from '../../repository/services/currency.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { AdvertisementListRequestDto } from '../dto/requses/advertisement-list.request.dto';
import { CreateAdvertisementRequestDto } from '../dto/requses/create-advertisement.request.dto';
import { UpdateAdvertisementRequestDto } from '../dto/requses/update-advertisement.request.dto';
import { AdvertisementResponceDto } from '../dto/response/advertisement.responce.dto';
import { AdvertisementListResponseDto } from '../dto/response/advertisement-list.response.dto';
import { AdvertisementWithPrices } from '../interfaces/price.interface';
import { AdvertisementMapper } from './advertisement.mapper';

@Injectable()
export class AdvertisementService {
  constructor(
    private readonly advertisementRepository: AdvertisementRepository,
    private readonly currencyRepository: CurrencyRepository,
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
    return AdvertisementMapper.toResponseCreateDto(advertisementEntity);
  }
  // TO DO
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
    const entityWithPrices = await this.calculatePrices(entity);
    return AdvertisementMapper.toResponseDto(entityWithPrices);
  }

  private async calculatePrices(
    entity: AdvertisementEntity,
  ): Promise<AdvertisementWithPrices> {
    const EUR = await this.currencyRepository.findOneBy({ ccy: 'EUR' });
    const USD = await this.currencyRepository.findOneBy({ ccy: 'USD' });

    let uah: number, eur: number, usd: number;

    if (entity.currency === 'UAH') {
      uah = +entity.price;
      eur = entity.price * EUR.sale;
      usd = entity.price * USD.sale;
    } else if (entity.currency === 'EUR') {
      uah = entity.price * EUR.buy;
      eur = +entity.price;
      usd = (entity.price * USD.buy) / EUR.sale;
    } else {
      uah = entity.price * USD.buy;
      eur = (entity.price * USD.buy) / EUR.sale;
      usd = +entity.price;
    }
    return { ...entity, uah, eur, usd };
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
    return AdvertisementMapper.toResponseCreateDto(newAdvertisement);
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
