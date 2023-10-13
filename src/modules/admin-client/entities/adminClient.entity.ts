import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserEntity } from 'src/modules/users/entities/user.entity';


@Schema()
export class AdminClient {
  @Prop({ type: String, required: true})
  name: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: Number, required: true })
  phone: number;

  @Prop()
  state: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserEntity;
}

export const ClientSchema = SchemaFactory.createForClass(AdminClient);
