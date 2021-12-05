import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

export type OfficeDocument = Office & Document;

@Schema()
export class Office {
  @Prop({required: true,unique: true})
  name: string;
}

export const OfficeSchema = SchemaFactory.createForClass(Office);