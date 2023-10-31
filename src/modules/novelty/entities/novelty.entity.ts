/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CategoriesNovelty } from 'src/modules/categories-novelty/entities/categories-novelties.entity';
import { Collaborator } from 'src/modules/collaborators/entities/collaborators.entity';
import { Concept } from 'src/modules/concepts/entities/concepts.entity';
import { Diagnosis } from 'src/modules/diagnosis/entities/diagnosis.entity';
import { Eps } from 'src/modules/eps/entities/eps.entity';
import { NoveltyState } from 'src/modules/state-novelty/entities/novelty-state.entity';

@Schema()
export class Novelty {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'collaborator' })
  collaborator: Collaborator;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'category-novelty' })
  categoryNovelty: CategoriesNovelty;

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'eps' })
  eps: Eps;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'diagnoses' })
  diagnosis: Diagnosis;

  @Prop()
  description: string;

  @Prop()
  documents: string[];

  @Prop({ type: Number, default: 0 })
  state: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const NoveltySchema = SchemaFactory.createForClass(Novelty);
