import { Schema, Prop } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { Roles } from 'src/modules/roles/entities/roles.entity';

@Schema()
export class CreateModuleParameterizationsDto{
  @IsString()
  module: string;

  @IsString()
  subModule: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  path: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Roles' })
  role: Roles;
}
