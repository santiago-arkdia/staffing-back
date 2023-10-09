/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Novelty {
  @Prop({ type: String, required: true })
  name: string;

  @Prop()
  performance: string;

  @Prop()
  state: string;

  @Prop()
  type: string;

  @Prop()
  numberInability: string;

  @Prop()
  initialDate: string;

  @Prop()
  finalDate: string;

  @Prop()
  typeOfAttention: string;

  @Prop()
  extension: string;

  @Prop()
  eps: string;

  @Prop()
  diagnosis: string;

  @Prop()
  Description: string;

  @Prop()
  documentUpload: string;
}

export const NoveltySchema = SchemaFactory.createForClass(Novelty);
