/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CategoriesNovelty } from 'src/modules/categories-novelty/entities/categories-novelties.entity';

@Schema({ collection: 'concepts' })
export class Concept {

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'category-novelty' })
  categoryNovelty: CategoriesNovelty[];

  @Prop({ type: String, required: true })
  name: string;

  @Prop()
  performance: string;

  @Prop()
  reportForm: string;

  @Prop()
  additionalText: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ConceptSchema = SchemaFactory.createForClass(Concept);
