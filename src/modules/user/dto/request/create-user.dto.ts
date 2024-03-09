import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsInt()
  age: number;

  @IsString()
  // @IsEmail()
  // @Matches()
  email: string;

  @IsString()
  // @Matches()
  password: string;

  @IsDate()
  @Type(() => Date)
  date: Date;
}
