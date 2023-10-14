/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsArray, IsBoolean, IsString } from 'class-validator';
import { Diagnosis } from 'src/modules/diagnosis/entities/diagnosis.entity';
import { Eps } from 'src/modules/eps/entities/eps.entity';

@Schema()
export class CreateNoveltyDto {
  @IsString()
  name: string;

  @IsString()
  performance: string;

  @IsString()
  state: string;

  @IsString()
  type: string;

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

  // @IsString()
  // eps: string;
  @IsArray()
  eps: Eps[];

  // @IsString()
  // diagnosis: string;
  @IsArray()
  diagnosis: Diagnosis[];

  @IsString()
  Description: string;

  @IsString()
  documentUpload: string;
}
