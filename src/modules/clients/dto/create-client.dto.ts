import { Schema, Prop } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsNumber, IsObject, IsString } from 'class-validator';
import { ModuleParameterization } from 'src/modules/module-parameterization/entities/module-parameterization.entity';

@Schema()
export class CreateClientsDto{
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
  state: number;

  @IsString()
  user: string;

  @IsObject()
  moduleParameterization: ModuleParameterization[];
}
