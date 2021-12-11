import { ArrayUnique, IsMongoId, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export class VoteDto {
  id: string;

  @ArrayUnique()
  @ValidateNested({ each: true })
  @Type(() => VoteData)
  data: VoteData[];
}

export class VoteData {
  @IsMongoId()
  office: string;
  @IsMongoId()
  candidate: string;
}
