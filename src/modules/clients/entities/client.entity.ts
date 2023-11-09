import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ModuleParameterization } from 'src/modules/module-parameterization/entities/module-parameterization.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Schema({ timestamps: true })
export class Client {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  type: string;

  @Prop({ type: String })
  branch: string;

  @Prop({ type: String })
  industrialSector: string;

  @Prop({ type: String })
  arl: string;

  @Prop({ type: String })
  ciiu: string;

  @Prop({ type: String })
  regimeType: string;

  @Prop({ type: String })
  profitCenter: string;

  @Prop({ type: String })
  commercialName: string;

  @Prop({ type: String })
  legalRepDocumentType: string;

  @Prop({ type: String })
  businessName: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  nit: string;

  @Prop({ type: String })
  verificationDigit: string;

  @Prop({ type: String })
  legalRepresentative: string;

  @Prop({ type: String })
  identificationLegalRep: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: Number })
  severanceProvisionPercentage: number;

  @Prop({ type: Number })
  severanceInterestProvisionPercentage: number;

  @Prop({ type: Number })
  totalSalary: number;

  @Prop({ type: String })
  country: string;

  @Prop({ type: String })
  municipality: string;

  @Prop({ type: String })
  billingEmail: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  addressDescription: string;

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
