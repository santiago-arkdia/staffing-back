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

  @IsString()
  type: string;

  @IsString()
  branch: string;

  @IsString()
  industrialSector: string;

  @IsString()
  arl: string;

  @IsString()
  ciiu: string;

  @IsString()
  regimeType: string;

  @IsString()
  profitCenter: string;

  @IsString()
  commercialName: string;

  @IsString()
  legalRepDocumentType: string;

  @IsString()
  businessName: string;

  @IsString()
  city: string;

  @IsString()
  nit: string;

  @IsString()
  verificationDigit: string;

  @IsString()
  legalRepresentative: string;

  @IsString()
  identificationLegalRep: string;

  @IsString()
  email: string;

  @IsNumber()
  severanceProvisionPercentage: number;

  @IsNumber()
  severanceInterestProvisionPercentage: number;

  @IsNumber()
  totalSalary: number;

  @IsString()
  country: string;

  @IsString()
  municipality: string;

  @IsString()
  billingEmail: string;

  @IsString()
  address: string;

  @IsString()
  addressDescription: string;

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
}
