/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({ collection: 'users' })
export class UserEntity {
  @Prop()
  id: number;

  @Prop({ type: String, required: true, unique: true, index: true })
  email: string;

  @Prop({ type: String, required: true})
  password: string;

  @Prop({ type: String, required: true})
  role: string;
  
/*
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: false })
  lastname: string;

  @Prop({ type: String, required: false })
  documentType: string;

  @Prop({ type: Number, required: false, unique: true, index: true })
  documentNumber: number;

  @Prop({ type: String, required: true})
  role: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: String})
  createdBy: string;*/
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
