import { Schema, Prop } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

@Schema()
export class CreateRolesDto{
  @IsString()
  role_key: string;

  @IsString()
  role_value: string;

  @IsString()
  role_type: string;

  @IsString()
  supervisor_role: string;
}