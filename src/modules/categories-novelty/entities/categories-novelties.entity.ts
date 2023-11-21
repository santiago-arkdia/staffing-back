/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'category-novelty', timestamps: true })
export class CategoriesNovelty {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  code: number;

  @Prop({ type: String, required: true })
  approves: string;

  @Prop({ type: String, required: true })
  manages: string;

  @Prop({ type: Number, default: 1 })
  state: number;
}

export const CategoriesNoveltySchema = SchemaFactory.createForClass(CategoriesNovelty);
