import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Region } from '../../regions/entities/region.entity';

@Schema({ collection: 'centers-costs' })
export class CentersCosts {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop()
  code: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Region' })
  region: Region;
}

export const CentersCostsSchema = SchemaFactory.createForClass(CentersCosts);
