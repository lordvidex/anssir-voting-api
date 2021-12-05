import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOfficeDto } from './dto/office-create.dto';
import { Office, OfficeDocument } from './office.schema';

@Injectable()
export class OfficesService {
  constructor(
    @InjectModel(Office.name) private officeModel: Model<OfficeDocument>,
  ) {}

  async createOffice(createOfficeDto: CreateOfficeDto): Promise<Office | undefined> {
    const office = new this.officeModel(createOfficeDto);
    try {
      return await office.save();
    } catch (error) {
      throw new BadRequestException('An error occured creating new office')
    }
  }

  async getOffices(): Promise<Office[]> {
    return await this.officeModel.find();
  }

  async deleteOffice(id: string): Promise<Office> {
    return await this.officeModel.findById(id).lean();
  }
}
