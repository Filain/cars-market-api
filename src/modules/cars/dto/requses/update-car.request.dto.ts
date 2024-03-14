import { PartialType } from '@nestjs/swagger';

import { CreateCarRequestDto } from './create-car.request.dto';

export class UpdateCarRequestDto extends PartialType(CreateCarRequestDto) {}
