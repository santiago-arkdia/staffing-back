/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Novelty-State' })
export class NoveltyState {
  @Prop({ type: String, required: true })
  name: string;
}

export const NoveltyStateSchema = SchemaFactory.createForClass(NoveltyState);
