import { PickType } from '@nestjs/swagger';

import { BaseAdvertisementRequestDto } from './base-advertisement.request.dto';

export class UpdateAdvertisementRequestDto extends PickType(
  BaseAdvertisementRequestDto,
  ['brand', 'model', 'price', 'currency', 'description'],
) {}
