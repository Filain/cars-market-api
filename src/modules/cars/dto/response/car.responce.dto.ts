import { PickType } from '@nestjs/swagger';

import { BaseCarRequestDto } from '../requses/base-car.request.dto';

export class CarResponceDto extends PickType(BaseCarRequestDto, [
  'brand',
  'model',
  'price',
  'currency',
  'description',
]) {}
