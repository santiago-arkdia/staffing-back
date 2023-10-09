/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CategoriesNews {
  @Prop({ type: String, required: true })
  name: string;
}

export const CategoriesNewsSchema = SchemaFactory.createForClass(CategoriesNews);
