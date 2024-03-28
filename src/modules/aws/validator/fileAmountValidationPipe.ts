import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileAmountValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException('File amount is required');
    }
    if (value.length > 10) {
      throw new BadRequestException('File amount must not exceed 10');
    }

    return value;
  }
}
