import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfficesModule } from './offices/offices.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    MongooseModule.forRoot('mongodb://localhost:27017/anssir'),
    OfficesModule,
    VoteModule,
  ]
})
export class AppModule {}
