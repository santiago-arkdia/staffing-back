import { Schema, Prop } from '@nestjs/mongoose';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@Schema()
export class PayrollsDto {
  @IsString()
  client: string;

  @IsString()
  approvedBYClient: string;

  @IsString()
  sendtobeApproved: string;

}
