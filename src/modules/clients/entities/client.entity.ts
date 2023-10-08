import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Schema()
export class Client {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  phone: string;

  // @Prop()
  // closeBillingDate: Date;

  @Prop()
  payrollFrequency: string;

  @Prop()
  payDay: number;

  // @Prop({ type: Date })
  // premiumPaymentDate: Date;

  @Prop()
  projected: boolean;

  @Prop()
  chat: boolean;

  @Prop()
  state: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserEntity;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
