import { BadRequestException, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

export class IDValidationPipe implements PipeTransform {
  transform(value: any) {
    if (isValidObjectId(value)) {
      return value;
    } else {
      throw new BadRequestException('Invalid ObjectID');
    }
  }
}
