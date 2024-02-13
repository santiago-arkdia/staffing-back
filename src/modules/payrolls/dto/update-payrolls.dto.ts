/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { PartialType } from '@nestjs/swagger';
import { PayrollsDto } from './payrolls.dto';
import { IsString } from 'class-validator';

@Schema()
export class UpdatPayrollDto extends PartialType(PayrollsDto) {
  @IsString()
  approvedByClient: string;

  @IsString()
  sendtobeApproved: string;

  @IsString()
  state: number;

  @IsString()
  comments: string[];

  @IsString()
  documents: string[];
}