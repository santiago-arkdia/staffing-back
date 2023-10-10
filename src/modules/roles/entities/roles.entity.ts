import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Roles {
  @Prop({ type: String, required: true })
  name: string;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
