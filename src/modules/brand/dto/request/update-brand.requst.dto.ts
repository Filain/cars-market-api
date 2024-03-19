import { PickType } from '@nestjs/swagger';

import { CreateBrandRequstDto } from './create-brand.requst.dto';

export class UpdateBrandRequstDto extends PickType(CreateBrandRequstDto, [
  'brand',
]) {}
