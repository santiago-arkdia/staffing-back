import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Country {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop()
  image: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);
