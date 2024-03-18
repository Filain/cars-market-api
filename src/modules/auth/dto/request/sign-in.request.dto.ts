import { PickType } from '@nestjs/swagger';

import { BaseUserRequestDto } from '../../../user/dto/request/base-user.request.dto';

export class SignInRequestDto extends PickType(BaseUserRequestDto, [
  'deviceId',
  'email',
  'password',
]) {}
