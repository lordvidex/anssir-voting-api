import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
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
  @HttpCode(200)
  async voteForCandidate(@Body() candidate: VoteDto): Promise<string> {
    const newResult = await this.voteService.voteForCandidate(candidate);
    // update the live listeners
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
