/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Diagnosis } from 'src/modules/diagnosis/entities/diagnosis.entity';
import { Eps } from 'src/modules/eps/entities/eps.entity';

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

  @Prop({ type: Date })
  initialDate: Date;

  @Prop({ type: Date })
  finalDate: Date;

  @Prop()
  typeOfAttention: string;

  @Prop()
  extension: boolean;

  // @Prop()
  // eps: string;
  @Prop({ type: mongoose.Schema.Types.Array, ref: 'eps' })
  eps: Eps[];

  // @Prop()
  // diagnosis: string;
  @Prop({ type: mongoose.Schema.Types.Array, ref: 'diagnoses' })
  diagnosis: Diagnosis[];

  @Prop()
  Description: string;

  @Prop()
  documentUpload: string;
}

export const NoveltySchema = SchemaFactory.createForClass(Novelty);
