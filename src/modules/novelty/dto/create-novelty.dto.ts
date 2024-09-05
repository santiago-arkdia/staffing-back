/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import {IsArray, IsDate, IsNumber, IsOptional, IsString , IsBoolean, IsObject} from 'class-validator';

// @Schema()
// export class CreateNoveltyDto {
//   @IsString()
//   client: string;

//   @IsString()
//   collaborator: string;

//   @IsString()
//   concept: string;

//   @IsString()
//   @IsOptional()
//   description: string;

//   @IsString()
//   @IsOptional()
//   contract: string;

//   @IsNumber()
//   @IsOptional()
//   value: number;

//   @IsDate()
//   @IsOptional()
//   date: Date;
  
//   @IsArray()
//   @IsOptional()
//   documents: string[];

// }


// import { Type } from 'class-transformer';
// import {
//   IsArray,
//   IsDate,
//   IsNumber,
//   IsOptional,
//   IsString,
//   ValidateNested,
// } from 'class-validator';

// class Documents {
//   // Define los atributos de Documents según necesites
// }

// class Contract {
//   // Define los atributos de Contract según necesites
// }

@Schema()
export class CreateNoveltyDto {
  @IsString()
  typeNovelty: 'novelty' | 'retirement' | 'social-security' | 'vinculations';

  @IsString()
  client: string;

  @IsString()
  collaborator: string;

  // Campos comunes a Novelty y Retirement
  @IsString()
  //@IsOptional()  cambio 
  concept?: string;

  @IsNumber()
  @IsOptional()
  state?: number;

  @IsObject()
  @IsOptional()
  reportingObject: Record<string, any>;

  @IsArray()
  @IsOptional()
  documents?: any[];

  @IsArray()
  @IsOptional()
  comments?: any[]; 

  @IsString()
  contract: string;

//   @IsString()
//  // @IsOptional()  cambio
//   contract: string;

//   // Campos exclusivos de Novelty
//   @IsString()
//   @IsOptional()
//   description?: string;

//   @IsNumber()
//   @IsOptional()
//   value?: number;

//   @IsDate()
//   @IsOptional()
//   @Type(() => Date)
//   date?: Date;

//   // Campos exclusivos de Retirement
//   @IsString()
//   @IsOptional()
//   finishDate?: string;

//   @IsString()
//   @IsOptional()
//   endDate?: string;

//   @IsString()
//   @IsOptional()
//   note?: string;
  

  

//   @IsNumber()
//   @IsOptional()
//   signedByApprover?: number;

//   @IsNumber()
//   @IsOptional()
//   signedByCollaborator?: number;

//   @IsNumber()
//   @IsOptional()
//   signedByManagment?: number;

//   @IsNumber()
//   @IsOptional()
//   loadedOnPayroll?: number;

//   // Campos exclusivos de SocialSecurity
//   @IsString()
//   @IsOptional()
//   utilityCenter?: string;

//   @IsString()
//   @IsOptional()
//   centersCosts?: string;

//   @IsString()
//   @IsOptional()
//   startDate?: string;

//   @IsString()
//   @IsOptional()
//   previousPeriod?: string;

//   @IsString()
//   @IsOptional()
//   observations?: string;

//   @IsObject()
//   @IsOptional()
//   temporApp: Record<string, any>;

//   // Campos comunes a todos

//   @IsNumber()
//   @IsOptional()
//   withSupportFile?: number;

//   @IsBoolean()
//   @IsOptional()
//   isSafeAndSound?: boolean;

//   @IsString()
//   @IsOptional()
//   whoReports?: boolean;
}

