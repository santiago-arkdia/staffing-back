/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { IsArray, IsBoolean, IsString } from 'class-validator';
import { Concept } from 'src/modules/concepts/entities/concepts.entity';
import { Diagnosis } from 'src/modules/diagnosis/entities/diagnosis.entity';
import { Eps } from 'src/modules/eps/entities/eps.entity';
import { NoveltyState } from 'src/modules/state-novelty/entities/novelty-state.entity';
import { TypeNovelty } from 'src/modules/type-novelty/entities/type-novelty.entity';

@Schema()
export class CreateNoveltyDto {
  @IsString()
  createBy: string;

  @IsString()
  designatedAnalyst: string;

  @IsString()
  client: string;

  @IsString()
  area: string;

  @IsString()
  noveltyGrouper: string;

  @IsArray()
  concept: Concept[];


  // @IsString()
  // state: string;
  @IsArray()
  state: NoveltyState[];

  @IsString()
  type: TypeNovelty[];

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
