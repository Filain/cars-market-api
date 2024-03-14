import { PickType } from '@nestjs/swagger';

import { BaseCarRequestDto } from './base-car.request.dto';

export class CreateCarRequestDto extends PickType(BaseCarRequestDto, [
  'brand',
  'model',
  'price',
  'currency',
  'description',
]) {}
