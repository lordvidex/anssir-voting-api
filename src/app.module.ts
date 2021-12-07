import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfficesModule } from './offices/offices.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { VoteModule } from './vote/vote.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URL') || 'mongodb://localhost:27017/anssir',
      }),
    }),
    OfficesModule,
    VoteModule,
  ],
})
export class AppModule {}
