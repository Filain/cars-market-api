import { UserResponseDto } from '../../../user/dto/response/user.response.dto';

export class AdvertisementResponceDto {
  brand: string;
  model: string;
  price: string;
  currency: string;
  description: string;
  created: Date;
  updated: Date;
  user?: UserResponseDto;
}
