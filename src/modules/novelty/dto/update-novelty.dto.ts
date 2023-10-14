/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
// import { DiagnosisModule } from 'src/modules/diagnosis/diagnosis.module';
// import { Eps } from 'src/modules/eps/entities/eps.entity';

@Schema()
export class UpdateNoveltyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  performance?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  numberInability?: string;

  @IsOptional()
  @IsDate()
  initialDate?: Date;

  @IsOptional()
  @IsDate()
  finalDate?: Date;

  @IsOptional()
  @IsString()
  typeOfAttention?: string;

  @IsOptional()
  @IsBoolean()
  extension?: boolean;

  // @IsOptional()
  // @IsString()
  // eps?: string;

  // @IsOptional()
  // @IsString()
  // diagnosis?: string;
  // @IsOptional()
  // @IsArray()
  // eps?: Eps[];

  // @IsOptional()
  // @IsArray()
  // diagnosis?: DiagnosisModule[];

  @IsOptional()
  @IsString()
  Description?: string;

  @IsOptional()
  @IsString()
  documentUpload?: string;
}
