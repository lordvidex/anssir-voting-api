import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfficesModule } from 'src/offices/offices.module';
import { VoteGateway } from 'src/vote/vote.gateway';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { Voted, VotedSchema } from './voted.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Voted.name, schema: VotedSchema }]),
    OfficesModule,
  ],
  controllers: [VoteController],
  providers: [VoteGateway, VoteService],
})
export class VoteModule {}
