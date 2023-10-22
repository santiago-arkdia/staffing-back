import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Region } from '../../regions/entities/region.entity';
import { UtilityCenter } from '../../utility-center/entities/utility-center.entity';
import { CentersCosts } from '../../centers-costs/entities/centers-costs.entity';

@Schema({ collection: 'utility-center' })
export class JobPositions {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Region' })
  region: Region;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UtilityCenter' })
  utilityCenter: UtilityCenter;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CentersCosts' })
  centersCosts: CentersCosts;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop()
  responsability: string;

  @Prop()
  objetive: string;

  @Prop()
  arl: string;

  @Prop()
  state: number;
  
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const JobPositionsSchema = SchemaFactory.createForClass(JobPositions);
