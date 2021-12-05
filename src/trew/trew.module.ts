import { Module } from '@nestjs/common';
import { TrewService } from './trew.service';
import { TrewGateway } from './trew.gateway';

@Module({
  providers: [TrewGateway, TrewService]
})
export class TrewModule {}
