import { Schema, Prop } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

@Schema()
export class CreateClientsDto{
  @IsString()
  name: string;

  @IsString()
  phone: string;

//   @IsDate()
//   closeBillingDate: Date;

  @IsString()
  payrollFrequency: string;

  @IsNumber()
  payDay: number;

//   @IsDate()
//   premiumPaymentDate: Date;

  @IsBoolean()
  projected: boolean;

  @IsBoolean()
  chat: boolean;

  @IsNumber()
  state: number;

  @IsString()
  user: string;
}
