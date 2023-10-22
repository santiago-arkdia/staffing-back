/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'arl' })
export class Arl {
  @Prop({ type: String, required: true })
  name: string;
}

export const ArlSchema = SchemaFactory.createForClass(Arl);
