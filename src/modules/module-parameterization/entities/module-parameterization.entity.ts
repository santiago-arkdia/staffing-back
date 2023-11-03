import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'module-parameterization', timestamps: true })
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
  @Prop({ type: String })
  role: string;

  /*@Prop({ type: Date, default: Date.now })
  createdAt: Date;*/
}

export const ModuleParameterizationSchema = SchemaFactory.createForClass(
  ModuleParameterization,
);
