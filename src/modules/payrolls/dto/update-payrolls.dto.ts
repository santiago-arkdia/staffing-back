/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { PartialType } from '@nestjs/swagger';
import { PayrollsDto } from './payrolls.dto';
import { IsOptional, IsString } from 'class-validator';

@Schema()
export class UpdatPayrollDto extends PartialType(PayrollsDto) {
  @IsString()
  @IsOptional()
  approvedByClient: string;

  @IsString()
  @IsOptional()
  sendtobeApproved: string;

  @IsString()
  @IsOptional()
  state: number;

  @IsString()
  @IsOptional()
  comments: string[];

  @IsString()
  @IsOptional()
  documents: string[];
}