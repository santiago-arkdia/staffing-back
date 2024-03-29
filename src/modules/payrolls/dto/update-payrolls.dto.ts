/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { PartialType } from '@nestjs/swagger';
import { PayrollsDto } from './payrolls.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

@Schema()
export class UpdatPayrollDto extends PartialType(PayrollsDto) {
  @IsString()
  @IsOptional()
  approvedByClient: string;

  @IsString()
  @IsOptional()
  sendToApproved: string;

  @IsString()
  @IsOptional()
  dateApproved: string;

  @IsString()
  @IsOptional()
  state: number;

  @IsArray()
  @IsOptional()
  comments: string[];

  @IsString()
  @IsOptional()
  document: string;
}