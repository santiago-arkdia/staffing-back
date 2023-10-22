/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'novelty-type' })
export class TypeNovelty {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const TypeNoveltySchema = SchemaFactory.createForClass(TypeNovelty);
