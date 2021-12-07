import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IDValidationPipe } from '../pipes/id-validation.pipe';
import { CandidateVoteHideInterceptor } from './candidate-vote.interceptor';
import { CreateOfficeDto } from './dto/office-create.dto';
import { UpdateOfficeDto } from './dto/office-update.dto';
import { Office } from './office.schema';
import { OfficesService } from './offices.service';

@UseInterceptors(CandidateVoteHideInterceptor)
@ApiTags('Office')
@Controller('offices')
export class OfficesController {
  constructor(private officesService: OfficesService) {}

  @Post()
  createOffice(@Body() createOfficeDto: CreateOfficeDto) {
    return this.officesService.createOffice(createOfficeDto);
  }

  @Get()
  getAllOffices(): Promise<Office[]> {
    return this.officesService.getOffices();
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

  @Get(':id')
  async getOfficeWithId(
    @Param('id', new IDValidationPipe()) officeId: string,
  ): Promise<Office> {
    return await this.officesService.getOfficeWithId(officeId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Appends `candidates` to database or changes officeName',
  })
  async updateOfficeWithId(
    @Param('id', new IDValidationPipe()) officeId: string,
    @Body() data: UpdateOfficeDto,
  ): Promise<Office> {
    return await this.officesService.updateOfficeWithId(officeId, data);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Overwrites `candidates` with provided list in the database',
  })
  async replaceOfficeWithId(
    @Param('id', new IDValidationPipe()) officeId: string,
    @Body() data: CreateOfficeDto,
  ): Promise<Office> {
    return await this.officesService.replaceOfficeWithId(officeId, data);
  }
}
