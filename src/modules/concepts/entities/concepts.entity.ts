/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CategoriesNovelty } from 'src/modules/categories-novelty/entities/categories-novelties.entity';
import { Roles } from 'src/modules/roles/entities/roles.entity';

@Schema({ collection: 'concepts' })
export class Concept {

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'category-novelty' })
  categoryNovelty: CategoriesNovelty;

  @Prop({ type: String, required: true })
  registers: Roles;

  @Prop({ type: String, required: true })
  approves: Roles;
  
  @Prop({ type: Number, default: 1 })
  state: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ConceptSchema = SchemaFactory.createForClass(Concept);
