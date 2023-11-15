import { Schema, Prop } from '@nestjs/mongoose';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ModuleParameterization } from 'src/modules/module-parameterization/entities/module-parameterization.entity';

@Schema()
export class PayrollsDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsNumber()
  documentType: string;

  @IsNumber()
  documentNumber: string;

  @IsString()
  user: string;

  @IsNumber()
  @IsOptional()
  state: number;

  @IsArray()
  moduleParameterization: ModuleParameterization[];
}
