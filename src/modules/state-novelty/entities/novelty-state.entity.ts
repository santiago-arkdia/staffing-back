/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'novelty-state' })
export class NoveltyState {
  @Prop({ type: String, required: true })
  name: string;

//   @Prop({ type: Date, default: Date.now })
//   createdAt: Date;
}

export const NoveltyStateSchema = SchemaFactory.createForClass(NoveltyState);
