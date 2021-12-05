import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCandidateDto } from './dto/candidate-create.dto';

@Controller('candidates')
export class CandidatesController {
  @Post()
  createCandidate(@Body() createCandidateDto: CreateCandidateDto){

  }

  @Get()
  getAllCandidates() {}

  @Get(':officeId')
  getCandidatesForOffice(@Param('officeId') officeId: String) {
    
  }
}
