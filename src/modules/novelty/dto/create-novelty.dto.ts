/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {IsArray, IsBoolean, IsNumber, IsString} from 'class-validator';

@Schema()
export class CreateNoveltyDto {
  @IsString()
  collaborator: string;

  @IsString()
  categoryNovelty: string;

  @IsString()
  numberInability: string;

  @IsString()
  initialDate: Date;

  @IsString()
  finalDate: Date;
  
  @IsString()
  typeOfAttention: string;
  
  @IsBoolean()
  extension: boolean;
  
  @IsString()
  eps: string;
  
  @IsString()
  diagnosis: string;
  
  @IsString()
  description: string;

  @IsNumber()
  value: number;

  @IsString()
  typeValue: string;
  
  @IsArray()
  documents: string[];

}
