/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'category-novelty' })
export class CategoriesNovelty {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  registrationRole: string

  @Prop({ type: String })
  approvalRole: string
  // @Prop()
  // state: number;

  // @Prop({ type: Date, default: Date.now })
  // createdAt: Date;
}

export const CategoriesNoveltySchema = SchemaFactory.createForClass(CategoriesNovelty);
