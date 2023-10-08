/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserServiceEntity>;

@Schema({ collection: 'services-users' })
export class UserServiceEntity {
  @Prop({ type: String, required: true })
  role: string;

  // @Prop({ type: String, required: true })
  // service: Record<string, boolean>;
  @Prop({ type: Object })
  service: any; // Cambia el tipo de datos a Mixed
}

export const UserSchema = SchemaFactory.createForClass(UserServiceEntity);
