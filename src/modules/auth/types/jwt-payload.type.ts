import { Role } from '../../../common/guard/enums/role.enum';

export type JwtPayload = {
  userId: string;
  deviceId: string;
  userRoles: Role;
};
