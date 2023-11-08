import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ModuleParameterization } from 'src/modules/module-parameterization/entities/module-parameterization.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Schema({ timestamps: true })
export class Client {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  nit: number;

  @Prop({ type: Number, required: true })
  verificationDigit: number;

  @Prop({ type: String, required: true })
  businessName: string;

  @Prop({ type: Array, required: true })
  businessData: {
    businessId: number;
    externalId: { type: number; default: 0 };
    externalId2: { type: number; default: 0 };
    commercialName: string;
    billingEmail: string;
    address: string;
    phone: string;
    email: string;
    contact: string;
    costCenters: {
      costCenterId: number;
      costCenterCode: string;
      costCenterDescription: string;
      externalId: number;
    }[];
  }[];

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
