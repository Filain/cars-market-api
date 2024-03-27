import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Role } from '../../../common/guard/enums/role.enum';
import { AdvertisementEntity } from '../../../database/entities/advertisement.entity';
import { TokenType } from '../../auth/enums/token-type.enum';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { AuthCacheService } from '../../auth/services/auth-cache.service';
import { AdvertisementRepository } from '../../repository/services/advirtisement.repository';
import { CurrencyRepository } from '../../repository/services/currency.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { ViewRepository } from '../../repository/services/view.repository';
import { EAccountTypes } from '../../user/enums/account-types.enum';
import { AdvertisementListRequestDto } from '../dto/requses/advertisement-list.request.dto';
import { CreateAdvertisementRequestDto } from '../dto/requses/create-advertisement.request.dto';
import { UpdateAdvertisementRequestDto } from '../dto/requses/update-advertisement.request.dto';
import { AdvertisementResponceDto } from '../dto/response/advertisement.responce.dto';
import { AdvertisementListResponseDto } from '../dto/response/advertisement-list.response.dto';
import { EStatus } from '../enums/car-status.enum';
import { AdvertisementWithPrices } from '../interfaces/price.interface';
import { AdvertisementMapper } from './advertisement.mapper';

@Injectable()
export class AdvertisementService {
  constructor(
    private readonly advertisementRepository: AdvertisementRepository,
    private readonly currencyRepository: CurrencyRepository,
    private userRepository: UserRepository,
    private viewRepository: ViewRepository,
  ) {}
  public async create(dto: CreateAdvertisementRequestDto, userData: IUserData) {
    const EUR = await this.currencyRepository.findOneBy({ ccy: 'EUR' });
    const USD = await this.currencyRepository.findOneBy({ ccy: 'USD' });

    let PriceUSD: number;
    if (dto.currency === 'UAH') {
      PriceUSD = dto.price / USD.sale;
    } else if (dto.currency === 'EUR') {
      PriceUSD = (dto.price * USD.buy) / EUR.sale;
    } else {
      PriceUSD = +dto.price;
    }

    const advertisementEntity = await this.advertisementRepository.save(
      this.advertisementRepository.create({
        ...dto,
        // price: priceToString,
        user_id: userData.userId,
        isValidate: EStatus.ACTIVE,
        priceFunc: PriceUSD,
      }),
    );
    return AdvertisementMapper.toResponseCreateDto(advertisementEntity);
  }

  public async findAll(
    query: AdvertisementListRequestDto,
  ): Promise<AdvertisementListResponseDto> {
    const [entities, total] = await this.advertisementRepository.findAll(query);
    return AdvertisementMapper.toListResponseDto(entities, total, query);
  }

  public async findOne(
    advertisementId: string,
    userData: IUserData,
  ): Promise<AdvertisementResponceDto> {
    const entity = await this.advertisementRepository.findOne({
      where: { id: advertisementId },
      relations: { user: true },
    });

    await this.viewRepository.save({
      advertisement_id: advertisementId,
    });
    const account = await this.userRepository.findOneBy({
      id: userData.userId,
    });

    if (account.accountType === EAccountTypes.PREMIUM) {
      const dayViews =
        await this.viewRepository.findViewsByDay(advertisementId);
      const weekViews =
        await this.viewRepository.findViewsByWeek(advertisementId);
      const monthViews =
        await this.viewRepository.findViewsByMonth(advertisementId);
      // const averagePrise = await this.advertisementRepository.average('priceFunc' );
      const averagePrise =
        await this.advertisementRepository.averagePrice(entity);
    }
    const entityWithPrices = await this.calculatePrices(entity);
    return AdvertisementMapper.toResponseDto(entityWithPrices);
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
  private async calculatePrices(
    entity: AdvertisementEntity,
  ): Promise<AdvertisementWithPrices> {
    const EUR = await this.currencyRepository.findOneBy({ ccy: 'EUR' });
    const USD = await this.currencyRepository.findOneBy({ ccy: 'USD' });

    let uah: number, eur: number, usd: number;

    if (entity.currency === 'UAH') {
      uah = +entity.price;
      eur = entity.price / EUR.sale;
      usd = entity.price / USD.sale;
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
}
