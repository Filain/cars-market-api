import { PickType } from '@nestjs/swagger';

import { BaseUserRequestDto } from '../../../user/dto/request/base-user.request.dto';

export class SignUpAdminRequestDto extends PickType(BaseUserRequestDto, [
  'deviceId',
  'name',
  'email',
  'password',
  'roles',
]) {}
