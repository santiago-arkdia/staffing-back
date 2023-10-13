import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Roles } from 'src/modules/roles/entities/roles.entity';

@Schema({ collection: 'module-parameterization' })
export class ModuleParameterization {
  @Prop({ type: String, required: true })
  module: string;

  @Prop({ type: String, required: true })
  subModule: string;

  @Prop()
  active: boolean;

  @Prop({ type: String, required: true })
  path: string;
  
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Roles' })
  // role: Roles;
  @Prop({ type: String})
  role: string;
}

export const ModuleParameterizationSchema = SchemaFactory.createForClass(ModuleParameterization);
