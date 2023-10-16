import { Schema, Prop } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

@Schema()
export class CreateJobPositionsDto{

  @IsString()
  region: string;

  @IsString()
  utilityCenter: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  responsability: string;

  @IsString()
  objetive: string;


  @IsString()
  arl: string;
  
}