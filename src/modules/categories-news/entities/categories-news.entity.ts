/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CategoriesNews {
  @Prop({ type: String, required: true })
  name: string;

  @Prop()
  state: number;
}

export const CategoriesNewsSchema = SchemaFactory.createForClass(CategoriesNews);
