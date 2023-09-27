/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({ collection: 'users' })
export class UserEntity {
  @Prop({ type: String, required: true, unique: true, index: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  lastname: string;

  @Prop({ type: String, required: true })
  documentType: string;

  @Prop({ type: Number, required: true, unique: true, index: true })
  documentNumber: number;

  @Prop({ type: String, required: true, default: 'user' })
  role: string;

  @Prop({ type: String })
  descripcion: string;

  @Prop({ type: String })
  image: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
