import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { AdvertisementRepository } from '../../modules/repository/services/advirtisement.repository';
import { UserRepository } from '../../modules/repository/services/user.repository';
import { EAccountTypes } from '../../modules/user/enums/account-types.enum';

@Injectable()
export class SellingLimits implements CanActivate {
  constructor(
    private advertisementRepository: AdvertisementRepository,
    private userRepository: UserRepository,
  ) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user_id = request.user.userId;
    const userAccountType = await this.userRepository.findOneBy({
      id: user_id,
    });

    const userAdvertisements = await this.advertisementRepository.findBy({
      user_id,
    });

    if (
      userAdvertisements.length >= 1 &&
      userAccountType.accountType === EAccountTypes.BASIC
    ) {
      throw new BadRequestException(
        'Your account type can post only one Advertisement',
      );
    }
    return true;
  }
}
