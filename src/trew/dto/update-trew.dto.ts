import { PartialType } from '@nestjs/mapped-types';
import { CreateTrewDto } from './create-trew.dto';

export class UpdateTrewDto extends PartialType(CreateTrewDto) {
  id: number;
}
