/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CategoriesNovelty } from 'src/modules/categories-novelty/entities/categories-novelties.entity';
import { Roles } from 'src/modules/roles/entities/roles.entity';

@Schema({ collection: 'concepts', timestamps: true })
export class Concept {

  @Prop({ type: String, required: true })
  code: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Boolean, required: true })
  benefit: boolean;

  @Prop({ type: String, required: true })
  reportType: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category-novelty' }] })
  categoryNovelty: CategoriesNovelty;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'roles' })
  registers: Roles;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'roles' })
  approves: Roles;
  
  @Prop({ type: Number, default: 1 })
  state: number;

  /*@Prop({ type: Date, default: Date.now })
  createdAt: Date;*/
}

export const ConceptSchema = SchemaFactory.createForClass(Concept);
