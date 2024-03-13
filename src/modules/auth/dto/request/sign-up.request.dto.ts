import { PickType } from '@nestjs/swagger';

import { BaseUserRequestDto } from '../../../user/dto/request/base-user.request.dto';
import { BaseAuthRequestDto } from './base-auth.request.dto';

export class SignUpRequestDto extends PickType(BaseUserRequestDto, [
  'deviceId',
  'name',
  'email',
  'password',
]) {}
