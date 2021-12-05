import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

export type CandidateDocument = Candidate & Document;

@Schema()
export class Candidate {
  @Prop({required: true, unique: true})
  @ApiProperty()
  name: string;

  @Prop({default: []})
  votes: string[];
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate)