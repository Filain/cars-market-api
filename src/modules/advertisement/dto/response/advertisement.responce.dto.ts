import { UserResponseDto } from '../../../user/dto/response/user.response.dto';

export class AdvertisementResponceDto {
  id: string;
  brand: string;
  model: string;
  price: number;
  currency: string;
  description: string;
  created: Date;
  updated: Date;
  isValidate: string;
  uah?: number;
  eur?: number;
  usd?: number;

  user?: UserResponseDto;
}
