/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Concept {
  @Prop({ type: String, required: true })
  name: string;

  @Prop()
  performance: string;

  @Prop()
  reportForm: string;

  @Prop()
  additionalText: string;
}

export const ConceptSchema = SchemaFactory.createForClass(Concept);
