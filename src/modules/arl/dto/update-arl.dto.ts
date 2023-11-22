/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsJSON, IsString} from 'class-validator';

@Schema()
export class UpdateArlDto {
  @IsString()
  name: string;

  @IsJSON()
  more: JSON;
}
