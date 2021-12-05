import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCandidateDto {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  @ApiProperty({ description: 'id of office this candidate is running for' })
  office: string;
}
