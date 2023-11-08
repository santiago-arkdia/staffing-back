import { Schema } from '@nestjs/mongoose';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ModuleParameterization } from 'src/modules/module-parameterization/entities/module-parameterization.entity';

@Schema()
export class CreateClientsDto {
  @IsString()
  name: string;

  @IsNumber()
  nit: number;

  @IsNumber()
  verificationDigit: number;

  @IsString()
  businessName: string;

  @IsArray()
  businessData: {
    businessId: number;
    externalId: number;
    externalId2: number;
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

  @IsString()
  phone: string;

  @IsDate()
  closeBillingDate: Date;

  @IsString()
  payrollFrequency: string;

  @IsNumber()
  payDay: number;

  @IsDate()
  premiumPaymentDate: Date;

  @IsBoolean()
  projected: boolean;

  @IsBoolean()
  chat: boolean;

  @IsOptional()
  @IsNumber()
  state: number;

  @IsString()
  user: string;

  @IsArray()
  moduleParameterization: ModuleParameterization[];

  // New Fields
  @IsString()
  billingEmail: string;

  @IsString()
  address: string;

  @IsNumber()
  costCenterId: number;

  @IsString()
  costCenterCode: string;

  @IsString()
  costCenterDescription: string;
}
