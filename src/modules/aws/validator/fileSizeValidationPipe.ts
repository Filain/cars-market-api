import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any) {
    const mimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const size = 5 * 1024 * 1024;
    if (!value || !value.originalname || !value.mimetype) {
      throw new BadRequestException('Invalid file');
    }

    if (!mimeTypes.includes(value.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    if (value.size > size) {
      throw new BadRequestException('File size must not exceed 5MB');
    }

    return value;
  }
}
