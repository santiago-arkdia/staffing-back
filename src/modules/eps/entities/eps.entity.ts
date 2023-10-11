/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Eps {
  @Prop({ type: String, required: true })
  name: string;
}

export const EpsSchema = SchemaFactory.createForClass(Eps);
