import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { BaseUserRequestDto } from '../../../user/dto/request/base-user.request.dto';
import { EAccountTypes } from '../../../user/enums/account-types.enum';

export class SignUpAdminRequestDto extends PickType(BaseUserRequestDto, [
  'deviceId',
  'name',
  'email',
  'password',
  'roles',
]) {
  @ApiProperty({ enum: EAccountTypes })
  @IsString()
  accountType?: EAccountTypes;
}
