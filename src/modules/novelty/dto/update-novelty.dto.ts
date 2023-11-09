/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsArray, IsBoolean, IsString } from 'class-validator';

@Schema()
export class UpdateNoveltyDto {
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
  
  @IsArray()
  documents: string[];
}
