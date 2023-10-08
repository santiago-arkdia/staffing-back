import { Schema, Prop } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

@Schema()
export class CreateModuleParameterizationsDto{
  @IsString()
  role: string;

  @IsString()
  module: string;

  @IsString()
  subModule: string;

  @IsString()
  active: boolean;
}
