import { PickType } from '@nestjs/swagger';

import { BaseCarRequestDto } from './base-car.request.dto';

export class UpdateCarRequestDto extends PickType(BaseCarRequestDto, [
  'brand',
  'model',
  'price',
  'currency',
  'description',
]) {}
