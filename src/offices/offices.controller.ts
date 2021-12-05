import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { IDValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateOfficeDto } from './dto/office-create.dto';
import { Office } from './office.schema';
import { OfficesService } from './offices.service';

@Controller('offices')
export class OfficesController {
  constructor(private officesService: OfficesService) {}

  @Post()
  createOffice(@Body() createOfficeDto: CreateOfficeDto) {
    return this.officesService.createOffice(createOfficeDto);
  }

  @Delete(':id')
  async deleteOffice(@Param('id', new IDValidationPipe()) officeId: string) {
    const deleted = await this.officesService.deleteOffice(officeId);
    return {
      message: 'OK',
      description: 'Office successfully deleted.',
      data: deleted,
    };
  }

  @Get()
  getAllOffices(): Promise<Office[]> {
    return this.officesService.getOffices();
  }
}
