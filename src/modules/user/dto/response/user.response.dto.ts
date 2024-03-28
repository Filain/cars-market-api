import { EAccountTypes } from '../../enums/account-types.enum';

export class UserResponseDto {
  id: string;

  name?: string;

  email: string;

  accountType?: EAccountTypes;

  roles: string;

  blocked?: boolean;

  image?: string;
  // avatar: user?.avatar ? `${configs.AWS_S3_URL}${user?.avatar}` : null,
}
