import { Schema } from '@nestjs/mongoose';
import { IsArray, IsOptional, IsString } from 'class-validator';

@Schema()
export class PayrollsDto {
  @IsString()
  @IsOptional()
  client: string;

  @IsArray()
  @IsOptional()
  novelty: string[];
}
