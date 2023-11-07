import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ collection: 'roles', timestamps: true })
export class Roles {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true })
  role_key: string;

  @Prop({ type: String, required: true })
  role_value: string;

  @Prop({ type: String, required: true })
  role_type: string;

  @Prop({ type: String, required: true })
  supervisor_role: string;

  /*@Prop({ type: Date, default: Date.now })
  createdAt: Date;*/
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
