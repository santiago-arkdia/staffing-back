import { Schema } from '@nestjs/mongoose';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { ModuleParameterization } from 'src/modules/module-parameterization/entities/module-parameterization.entity';

@Schema()
export class CreateAdminsDto{
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsNumber()
  documentType: string;

  @IsNumber()
  documentNumber: string;

  @IsString()
  type: string;

  @IsString()
  user: string;
  
  @IsObject()
  moduleParameterization: ModuleParameterization[];
}
