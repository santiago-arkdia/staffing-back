import { Schema } from '@nestjs/mongoose';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ModuleParameterization } from 'src/modules/module-parameterization/entities/module-parameterization.entity';

@Schema()
export class CreateClientsDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  closeBillingDate: Date;

  @IsString()
  payrollFrequency: string;

  @IsNumber()
  payDay: number;

  @IsString()
  premiumPaymentDate: Date;

  @IsBoolean()
  projected: boolean;

  @IsBoolean()
  chat: boolean;

  @IsNumber()
  @IsOptional()
  state: number;

  @IsString()
  user: string;

  @IsArray()
  moduleParameterization: ModuleParameterization[];

  //New Fields

  @IsNumber()
  nit: number;

  @IsNumber()
  verificationDigit: number;

  @IsString()
  businessName: string;

  @IsArray()
  businessData: any[];

  @IsNumber()
  businessId: number;

  @IsNumber()
  externalId: number;

  @IsNumber()
  externalId2: number;

  @IsString()
  billingEmail: string;

  @IsString()
  address: string;

  @IsArray()
  costCenter: any[];

  @IsNumber()
  costCenterId: number;

  @IsString()
  costCenterCode: string;

  @IsString()
  costCenterDescription: string;
}
