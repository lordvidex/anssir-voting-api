import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VoteGateway } from 'src/vote/vote.gateway';
import { VoteDto } from './dto/vote.dto';
import { VoteService } from './vote.service';

@ApiTags('Vote')
@Controller('vote')
export class VoteController {
  constructor(
    private voteService: VoteService,
    private voteGateway: VoteGateway,
  ) {}

  @Post()
  async voteForCandidate(@Body() candidate: VoteDto): Promise<string> {
    const newResult = await this.voteService.voteForCandidate(candidate);
    console.log(newResult)
    this.voteGateway.broadCastResult(newResult);
    return 'Vote successfully counted';
  }

  @Get('results')
  async votingResults() {
    return await this.voteService.getVotingResults();
  }

  @Get('voters')
  async getVoters() {
    return await this.voteService.getVoters();
  }
}
