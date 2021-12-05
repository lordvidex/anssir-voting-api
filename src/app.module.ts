import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfficesModule } from './offices/offices.module';
import { CandidatesModule } from './candidates/candidates.module';
import { TrewModule } from './trew/trew.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    MongooseModule.forRoot('mongodb://localhost:27017/anssir'),
    OfficesModule,
    CandidatesModule,
    TrewModule,
  ],
})
export class AppModule {}
