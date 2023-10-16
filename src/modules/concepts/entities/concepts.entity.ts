/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'concepts' })
export class Concept {
  @Prop({ type: String, required: true })
  name: string;

  @Prop()
  performance: string;

  @Prop()
  reportForm: string;

  @Prop()
  additionalText: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ConceptSchema = SchemaFactory.createForClass(Concept);
