import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Office, OfficeSchema } from './office.schema';
import { OfficesController } from './offices.controller';
import { OfficesService } from './offices.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Office.name, schema: OfficeSchema }]),
  ],
  controllers: [OfficesController],
  providers: [OfficesService],
})
export class OfficesModule {}
