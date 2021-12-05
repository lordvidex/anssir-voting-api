import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOfficeDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'name of the office or post',
    example: 'President',
  })
  name: string;
  
  @ApiProperty({
    description: 'list of candidate names for this office',
    example: ['Evans Owamoyo', 'Evans2 Owamoyo2'],
  })
  candidates: string[];
}
