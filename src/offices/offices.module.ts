import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidate, CandidateSchema } from './candidate.schema';
import { Office, OfficeSchema } from './office.schema';
import { OfficesController } from './offices.controller';
import { OfficesService } from './offices.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Office.name, schema: OfficeSchema },
      {
        name: Candidate.name,
        schema: CandidateSchema,
      },
    ]),
  ],
  controllers: [OfficesController],
  providers: [OfficesService],
  exports: [MongooseModule],
})
export class OfficesModule {}
