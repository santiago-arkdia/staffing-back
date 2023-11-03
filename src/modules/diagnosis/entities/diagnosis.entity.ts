/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'diagnoses', timestamps: true })
export class Diagnosis {
  @Prop({ type: String, required: true })
  name: string;

  /*@Prop({ type: Date, default: Date.now })
  createdAt: Date;*/
}

export const DiagnosisSchema = SchemaFactory.createForClass(Diagnosis);
