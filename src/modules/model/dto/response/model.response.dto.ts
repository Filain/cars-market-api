import { Exclude } from 'class-transformer';

@Exclude()
export class ModelResponseDto {
  model: string;
}
