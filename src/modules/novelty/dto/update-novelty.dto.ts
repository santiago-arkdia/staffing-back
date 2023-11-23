/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
  ValidateNested, IsDate
} from 'class-validator';
import {Type} from "class-transformer";
class CommentObject {
  @IsString()
  comment: string;

  @IsString()
  user: string;

  @IsDateString()
  date: string;
}
@Schema()
export class UpdateNoveltyDto {
  @IsOptional()
  @IsString()
  collaborator: string;

  @IsOptional()
  @IsString()
  categoryNovelty: string;

  @IsOptional()
  @IsString()
  numberInability: string;

  @IsOptional()
  @IsString()
  initialDate: Date;

  @IsOptional()
  @IsString()
  finalDate: Date;

  @IsOptional()
  @IsString()
  typeOfAttention: string;

  @IsOptional()
  @IsBoolean()
  extension: boolean;

  @IsOptional()
  @IsString()
  eps: string;

  @IsOptional()
  @IsString()
  diagnosis: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  documents: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CommentObject)
  comments: CommentObject[];

  @IsOptional()
  @IsNumber()
  state: number;

  // Nuevos campos
  @IsString()
  @IsOptional()
  identification?: string;

  @IsString()
  @IsOptional()
  documentType?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  secondLastName?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  secondName?: string;

  @IsString()
  @IsOptional()
  vinculationReason?: string;

  @IsDate()
  @IsOptional()
  entryDate?: Date;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  ccBranch?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsNumber()
  @IsOptional()
  totalHours?: number;

  @IsNumber()
  @IsOptional()
  salary?: number;

  @IsNumber()
  @IsOptional()
  transportationAllowance?: number;

  @IsString()
  @IsOptional()
  payrollType?: string;

  @IsString()
  @IsOptional()
  range?: string;

  @IsString()
  @IsOptional()
  costCenter?: string;

  @IsString()
  @IsOptional()
  variableScheme?: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsString()
  @IsOptional()
  replaces?: string;

  @IsString()
  @IsOptional()
  observations?: string;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsString()
  @IsOptional()
  transferCity?: string;

  @IsString()
  @IsOptional()
  transferBranch?: string;

  @IsString()
  @IsOptional()
  replacesTransfer?: string;

  @IsDate()
  @IsOptional()
  promotionDate?: Date;

  @IsString()
  @IsOptional()
  newPosition?: string;

  @IsString()
  @IsOptional()
  newCostCenter?: string;

  @IsString()
  @IsOptional()
  newScheme?: string;

  @IsNumber()
  @IsOptional()
  newSalary?: number;

  @IsNumber()
  @IsOptional()
  newTransportationAllowance?: number;

  @IsString()
  @IsOptional()
  newHours?: string;

  @IsString()
  @IsOptional()
  newPayrollType?: string;

  @IsString()
  @IsOptional()
  newRange?: string;

  @IsString()
  @IsOptional()
  retirementReason?: string;

  @IsDate()
  @IsOptional()
  retirementDate?: Date;

  @IsString()
  @IsOptional()
  scheduleChangeReason?: string;

  @IsString()
  @IsOptional()
  newSchedule?: string;

  @IsString()
  @IsOptional()
  conceptType?: string;

  @IsNumber()
  @IsOptional()
  value?: number;
}
