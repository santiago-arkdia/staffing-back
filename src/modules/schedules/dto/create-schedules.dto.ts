import { Schema, Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';

@Schema()
export class CreateSchedulesDto{

  @IsString()
  name: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsString()
  weekDay: string;

}

export class CreateMultipleSchedulesDto {
  @ValidateNested({ each: true })
  @Type(() => CreateSchedulesDto)
  schedules: CreateSchedulesDto[];
}