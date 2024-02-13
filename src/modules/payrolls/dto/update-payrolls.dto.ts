/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { PartialType } from '@nestjs/swagger';
import { PayrollsDto } from './payrolls.dto';

@Schema()
export class UpdatPayrollDto extends PartialType(PayrollsDto) {}
