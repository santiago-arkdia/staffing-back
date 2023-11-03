import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ModuleParameterization } from 'src/modules/module-parameterization/entities/module-parameterization.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Schema({ timestamps: true })
export class Client {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: Date })
  closeBillingDate: Date;

  @Prop()
  payrollFrequency: string;

  @Prop()
  payDay: number;

  @Prop({ type: Date })
  premiumPaymentDate: Date;

  @Prop()
  projected: boolean;

  @Prop()
  chat: boolean;

  @Prop()
  state: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserEntity;

  @Prop({ type: mongoose.Schema.Types.Array, ref: 'ModuleParameterization' })
  moduleParameterization: ModuleParameterization[];

  /*@Prop({ type: Date, default: Date.now })
  createdAt: Date;*/
}

export const ClientSchema = SchemaFactory.createForClass(Client);
