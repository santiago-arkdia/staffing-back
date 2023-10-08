import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'module-parameterization' })
export class ModuleParameterization {
  @Prop({ type: String, required: true })
  module: string;

  @Prop({ type: String, required: true })
  subModule: string;

  @Prop()
  active: boolean;
}

export const ModuleParameterizationSchema = SchemaFactory.createForClass(ModuleParameterization);
