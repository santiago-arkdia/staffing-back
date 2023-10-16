import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Country {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop()
  image: string;

  @Prop()
  state: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
