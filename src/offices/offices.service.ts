import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Candidate, CandidateDocument } from './candidate.schema';
import { CreateOfficeDto } from './dto/office-create.dto';
import { UpdateOfficeDto } from './dto/office-update.dto';
import { Office, OfficeDocument } from './office.schema';

@Injectable()
export class OfficesService {
  constructor(
    @InjectModel(Office.name) private officeModel: Model<OfficeDocument>,
    @InjectModel(Candidate.name)
    private candidateModel: Model<CandidateDocument>,
  ) {}

  async createOffice(
    createOfficeDto: CreateOfficeDto,
  ): Promise<Office | undefined> {
    const { name, candidates } = createOfficeDto;
    const office = new this.officeModel({
      name: name,
      candidates: this.candidateListToModels(candidates),
    });
    try {
      return await office.save();
    } catch (error) {
      throw new BadRequestException('An error occured creating new office');
    }
  }

  async replaceOfficeWithId(
    id: string,
    data: CreateOfficeDto,
  ): Promise<Office> {
    const office = await this.officeModel.findById(id);
    const { name, candidates } = data;
    if (!candidates || candidates.length === 0) {
      throw new BadRequestException('No candidates found');
    }
    if (name) {
      office.name = name;
    }
    office.candidates = this.candidateListToModels(candidates);
    return await office.save();
  }

  async getOffices(): Promise<Office[]> {
    return await this.officeModel.find().select('-__v');
  }

  async getOfficeWithId(id: string): Promise<Office> {
    return await this.officeModel.findOne({ _id: id });
  }

  async deleteOffice(id: string): Promise<Office> {
    return await this.officeModel.findByIdAndRemove(id).lean();
  }

  async updateOfficeWithId(id: string, data: UpdateOfficeDto): Promise<Office> {
    const office = await this.officeModel.findById(id);
    const { candidates, name } = data;
    var candidateObjects: Candidate[];
    if (candidates) {
      candidateObjects = this.candidateListToModels(candidates);
      office.candidates.push.apply(office.candidates, candidateObjects);
    }
    if (name) {
      office.name = name;
    }
    return await office.save();
  }

  candidateListToModels(arr: string[]): CandidateDocument[] {
    return arr.map((candidate) => new this.candidateModel({ name: candidate }));
  }
}
