import { PickType } from '@nestjs/swagger';

import { BaseModelRequestDto } from './base-model.request.dto';

export class CreateModelRequestDto extends PickType(BaseModelRequestDto, [
  'brand',
]) {}
