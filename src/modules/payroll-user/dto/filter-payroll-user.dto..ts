import { Schema } from '@nestjs/mongoose';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Schema()
export class FilterPayrollUserDto{
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsNumber()
  @IsOptional()
  state: number;
}
