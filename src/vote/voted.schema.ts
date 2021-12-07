import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type VotedDocument = Voted & Document;

@Schema({collection: 'voted'})
export class Voted {
  @Prop({unique: true})
  voter_id: string;
}

export const VotedSchema = SchemaFactory.createForClass(Voted);