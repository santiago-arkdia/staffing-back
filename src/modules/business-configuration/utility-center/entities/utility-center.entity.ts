import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Region } from '../../regions/entities/region.entity';

@Schema({ collection: 'utility-center' })
export class UtilityCenter {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop()
  code: string;

  @Prop()
  state: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Region' })
  region: Region;
}

export const UtilityCenterSchema = SchemaFactory.createForClass(UtilityCenter);
