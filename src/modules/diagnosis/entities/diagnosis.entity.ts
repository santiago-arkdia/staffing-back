/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'diagnoses' })
export class Diagnosis {
  @Prop({ type: String, required: true })
  name: string;
}

export const DiagnosisSchema = SchemaFactory.createForClass(Diagnosis);
