import { PickType } from '@nestjs/swagger';

import { BaseModelRequestDto } from './base-model.request.dto';

export class UpdateModelRequestDto extends PickType(BaseModelRequestDto, [
  'model',
]) {}
