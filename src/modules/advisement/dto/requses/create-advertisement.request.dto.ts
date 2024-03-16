import { PickType } from '@nestjs/swagger';

import { BaseAdvertisementRequestDto } from './base-advertisement.request.dto';

export class CreateAdvertisementRequestDto extends PickType(
  BaseAdvertisementRequestDto,
  ['brand', 'model', 'price', 'currency', 'description'],
) {}
