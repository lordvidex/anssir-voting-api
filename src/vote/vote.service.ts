import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Set } from 'typescript-collections';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Types } from 'mongoose';
import { Office, OfficeDocument } from '../offices/office.schema';
import { VoteData, VoteDto } from './dto/vote.dto';
import { Voted, VotedDocument } from './voted.schema';

@Injectable()
export class VoteService {
  constructor(
    @InjectModel(Voted.name) private votedModel: Model<VotedDocument>,
    @InjectModel(Office.name) private officeModel: Model<OfficeDocument>,
  ) {}

  async getVotingResults(): Promise<Office[]> {
    return await this.officeModel.find().select('-__v').exec();
  }

  async voteForCandidate(voteDto: VoteDto): Promise<Office[]> {
    const { id, data } = voteDto;
    if (await this.hasVoted(id)) {
      throw new BadRequestException('This user has already voted');
    }

    const set: Set<VoteData> = new Set();

    data.forEach((v) => set.add(v));
    try {
      const offices = await this.validateVotes(set.toArray());
      this.countVotes(offices, id);
      return await this.getVotingResults();
    } catch (err) {
      throw err;
    }
  }

  /**
   * 
   * @param id id of the voter
   * @returns true if user has voted before or false otherwise
   */
  async hasVoted(id: string): Promise<boolean> {
    const userId = await this.votedModel.findOne({ voter_id: id });
    return userId != null;
  }

  async addVote(id: string): Promise<Voted> {
    const newVotedUser = new this.votedModel({ voter_id: id });
    return await newVotedUser.save();
  }

  async getVoters(): Promise<Voted[]> {
    return await this.votedModel.find();
  }

  async validateVotes(votes: VoteData[]): Promise<OfficeDocument[]> {
    const offices: OfficeDocument[] = [];

    for await (const vote of votes) {
      const office = await this.officeModel.findById(vote.office, {
        candidates: {
          $elemMatch: { _id: new Types.ObjectId(vote.candidate) },
        },
      });
      if (office == null || office.candidates.length === 0) {
        throw new NotFoundException(
          `Office with id ${vote.office} not found or candidate with id ${vote.candidate} not found`,
        );
      } else {
        offices.push(office);
      }
    }
    return offices;
  }

  async countVotes(votes: OfficeDocument[], userId: string) {
    for await (const vote of votes) {
      vote.candidates[0].votes.push(userId);
      await this.officeModel
        .updateOne(
          {
            _id: vote._id,
            candidates: { $elemMatch: { _id: vote.candidates[0]._id } },
          },
          {
            $set: { 'candidates.$.votes': vote.candidates[0].votes },
          },
        )
        .exec();
      await this.addVote(userId);
    }
  }
}
