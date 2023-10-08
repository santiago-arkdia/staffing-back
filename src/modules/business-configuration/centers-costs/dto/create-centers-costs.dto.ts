import { Schema, Prop } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

@Schema()
export class CreateCentersCostsDto{
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  code: string;

  @IsString()
  region: string;
}
