/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@Schema()
export class CreateAccountingInterfaceDto {

  @IsString()
  @IsNotEmpty()
  payroll: string;

  @IsString()
  @IsOptional()
  socialSecurity: string;

  @IsString()
  @IsOptional()
  reteSource: string;

  @IsString()
  @IsOptional()
  month: string;

  @IsString()
  @IsOptional()
  year: string;

  @IsString()
  @IsOptional()
  client: string;

  @IsString()
  @IsOptional()
  acountingInterface: string;

  @IsNumber()
  @IsOptional()
  state: number;

}
