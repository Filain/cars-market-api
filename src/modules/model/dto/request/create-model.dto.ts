import { IsString } from 'class-validator';

export class CreateModelDto {
  @IsString()
  model: string;
}
