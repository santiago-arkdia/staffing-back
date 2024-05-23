/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsString } from 'class-validator';

@Schema()
export class CreateAccountingInterfaceDto {
  @IsString()
  name: string;

  @IsString()
  payroll: string;

  @IsString()
  socialSecurity: string;

  @IsString()
  reteSource: string;

  @IsString()
  time: string;

  @IsString()
  client: string;

  @IsString()
  acountingInterface: string;
}
