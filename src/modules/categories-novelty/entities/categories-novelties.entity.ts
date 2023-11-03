/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'category-novelty', timestamps: true })
export class CategoriesNovelty {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, default: 1 })
  state: number;

  /*@Prop({ type: Date, default: Date.now })
  createdAt: Date;*/
}

export const CategoriesNoveltySchema = SchemaFactory.createForClass(CategoriesNovelty);
