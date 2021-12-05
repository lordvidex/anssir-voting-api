import { Injectable } from '@nestjs/common';
import { CreateTrewDto } from './dto/create-trew.dto';
import { UpdateTrewDto } from './dto/update-trew.dto';

@Injectable()
export class TrewService {
  create(createTrewDto: CreateTrewDto) {
    return 'This action adds a new trew';
  }

  findAll() {
    return `This action returns all trew`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trew`;
  }

  update(id: number, updateTrewDto: UpdateTrewDto) {
    return `This action updates a #${id} trew`;
  }

  remove(id: number) {
    return `This action removes a #${id} trew`;
  }
}
