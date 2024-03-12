import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { BaseUserRequestDto } from 'src/modules/user/dto/request/base-user.request.dto';

import { Role } from '../../../../common/guard/enums/role.enum';

export class BaseAuthRequestDto extends PickType(BaseUserRequestDto, [
  'name',
  'email',
  'password',
  'roles',
]) {
  @IsNotEmpty()
  @IsString()
  readonly deviceId: string;
}
