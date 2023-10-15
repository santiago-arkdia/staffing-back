/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Novelty-Type' })
export class TypeNovelty {
  @Prop({ type: String, required: true })
  name: string;
}

export const TypeNoveltySchema = SchemaFactory.createForClass(TypeNovelty);
