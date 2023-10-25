/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Concept } from 'src/modules/concepts/entities/concepts.entity';
import { Diagnosis } from 'src/modules/diagnosis/entities/diagnosis.entity';
import { Eps } from 'src/modules/eps/entities/eps.entity';
import { NoveltyState } from 'src/modules/state-novelty/entities/novelty-state.entity';

@Schema()
export class Novelty {
  @Prop({ type: String, required: true })
  createBy: string;

  @Prop({ type: String })
  designatedAnalyst: string;

  @Prop({ type: String })
  client: string;

  @Prop({ type: String })
  area: string;

  @Prop()
  performance: string;

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'concepts' })
  concept: Concept[];

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'Novelty-State' })
  state: NoveltyState[];

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

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'eps' })
  eps: Eps[];

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'diagnoses' })
  diagnosis: Diagnosis[];

  @Prop()
  Description: string;

  @Prop()
  documentUpload: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const NoveltySchema = SchemaFactory.createForClass(Novelty);
