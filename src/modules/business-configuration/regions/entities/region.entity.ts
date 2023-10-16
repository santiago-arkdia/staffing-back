import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Country } from '../../country/entities/country.entity';
import mongoose from 'mongoose';

@Schema()
export class Region {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop()
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Country' })
  country: Country;

  @Prop()
  state: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const RegionSchema = SchemaFactory.createForClass(Region);
