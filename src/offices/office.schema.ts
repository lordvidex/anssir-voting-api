import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Candidate } from './candidate.schema';

export type OfficeDocument = Office & Document;

@Schema()
export class Office {
  @Prop({ required: true, unique: true })
  @ApiProperty()
  name: string;

  @Prop()
  @ApiProperty({
    description: 'List of candidates contesting for this position',
  })
  candidates: Candidate[];
}

export const OfficeSchema = SchemaFactory.createForClass(Office);
