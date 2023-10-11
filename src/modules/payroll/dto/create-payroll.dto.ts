import { Schema, Prop } from '@nestjs/mongoose';
import { IsArray, IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { ModuleParameterization } from 'src/modules/module-parameterization/entities/module-parameterization.entity';

@Schema()
export class CreatePayrollsDto{
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

  @IsString()
  state: string;

  @IsArray()
  moduleParameterization: ModuleParameterization[];
}
