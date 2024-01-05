import { Schema, Prop } from '@nestjs/mongoose';
import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString, isNumber } from 'class-validator';
import { Schedules } from 'src/modules/schedules/entities/schedules.entity';

@Schema()
export class CreateHourlyMeshesDto{

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  jobPositions: string;

  @IsArray()
  @IsOptional()
  schedules: Schedules[];

  @IsNumber()
  state: number;

}