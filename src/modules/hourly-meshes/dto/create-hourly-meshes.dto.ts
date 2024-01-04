import { Schema, Prop } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsNumber, IsString, isNumber } from 'class-validator';

@Schema()
export class CreateHourlyMeshesDto{

  @IsString()
  name: string;

  @IsString()
  jobPositions: string;

  @IsNumber()
  state: number;

}