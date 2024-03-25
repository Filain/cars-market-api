import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { EStatus } from '../../modules/advertisement/enums/car-status.enum';
import { AdvertisementRepository } from '../../modules/repository/services/advirtisement.repository';
import { bannedWords } from './constants/bannedWordList';

@Injectable()
export class BannedWordsGuards implements CanActivate {
  private numberOfEditAttempts = 0;
  private readonly maxNumberOfEditAttempts = 3;
  private isAdvertisementSaved = false;
  private previousToken: string; // Зберігаємо попередній токен

  constructor(private advertisementRepository: AdvertisementRepository) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const description = request.body.description;
    const title = request.body.title;
    const currentToken = request.headers['authorization']; // Припустимо, що токен передається через заголовок "Authorization"

    if (this.previousToken !== currentToken) {
      this.numberOfEditAttempts = 0; // Обнулюємо numberOfEditAttempts, якщо токен змінився
      this.previousToken = currentToken;
      this.isAdvertisementSaved = false;
    }

    if (this.isAdvertisementSaved) {
      throw new BadRequestException(
        'You have reached the maximum number of edit attempts in this AdvertisementSaved',
      );
    }

    if (this.numberOfEditAttempts === this.maxNumberOfEditAttempts) {
      await this.advertisementRepository.save(
        this.advertisementRepository.create({
          ...request.body,
          user_id: request.user.userId,
          isValidate: EStatus.NOT_ACTIVE,
        }),
      );
      // TO DO Зробити насилання повідомлення 1 раз  і онулити  isAdvertisementSaved=false, і isAdvertisementSaved=0 - - - - - - - - -- - - - - - - - - - - - -- - - - - - - - - - - - -- -  -- - - - - -- - - - - - - - - - -- - - - - - - -

      this.isAdvertisementSaved = true; // Позначаємо, що оголошення було збережено
      throw new BadRequestException(
        'You have reached the maximum number of edit attempts',
      );
    }

    const containsBannedWords = this.checkForBannedWords(
      description,
      title,
      bannedWords,
    );

    if (containsBannedWords) {
      this.numberOfEditAttempts++;
      throw new BadRequestException(
        'The description or title contains invalid words',
      );
    }
    return true;
  }

  private checkForBannedWords(
    title: string,
    description: string,
    bannedWords: string[],
  ): boolean {
    if (!description || !title) {
      throw new BadRequestException('Description or title is empty');
    }
    for (const word of bannedWords) {
      if (description.includes(word) || title.includes(word)) {
        return true;
      }
    }
    return false;
  }
}
