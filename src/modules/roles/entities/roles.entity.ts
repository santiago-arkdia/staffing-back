import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Roles {
  
  @Prop({ type: String, required: true })
  role_key: string;

  @Prop({ type: String, required: true })
  role_value: string;

  @Prop({ type: String, required: true })
  role_type: string;

  @Prop({ type: String, required: true })
  supervisor_role: string;

}

export const RolesSchema = SchemaFactory.createForClass(Roles);

