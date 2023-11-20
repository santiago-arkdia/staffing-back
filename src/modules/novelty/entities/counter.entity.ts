/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Counter {
  @Prop()
  model: string;

  @Prop()
  field: string;

  @Prop()
  count: number;
}

export const CounterSchema = SchemaFactory.createForClass(Counter);
