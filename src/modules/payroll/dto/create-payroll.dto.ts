import { Schema, Prop } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

@Schema()
export class CreatePayrollsDto{
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsNumber()
  documentType: string;

  @IsNumber()
  documentNumber: string;

  @IsString()
  user: string;
}
