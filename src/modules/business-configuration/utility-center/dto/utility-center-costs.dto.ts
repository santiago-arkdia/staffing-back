import { Schema, Prop } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

@Schema()
export class CreateUtilityCenterDto{
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  code: string;

  @IsString()
  region: string;
}
