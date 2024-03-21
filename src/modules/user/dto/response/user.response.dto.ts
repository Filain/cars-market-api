import { EAccountTypes } from '../../enums/account-types.enum';

export class UserResponseDto {
  id: string;

  name?: string;

  email: string;

  accountType?: EAccountTypes;

  roles: string;
}
