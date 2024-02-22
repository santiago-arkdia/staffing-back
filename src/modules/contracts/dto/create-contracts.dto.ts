import { IsString, IsNumber, IsOptional, IsDate } from 'class-validator';

export class CreateContractDto {

  @IsString()
  @IsOptional()
  contractCode: string;

  @IsString()
  @IsOptional()
  contractType: string;

  @IsString()
  @IsOptional()
  settlementType: string;

  @IsString()
  @IsOptional()
  paymentFrequency: string;

  @IsString()
  @IsOptional()
  client: string;

  @IsString()
  @IsOptional()
  collaborator: string;

  @IsString()
  @IsOptional()
  pensionFund: string;

  @IsString()
  @IsOptional()
  epsEntity: string;

  @IsString()
  @IsOptional()
  severanceFund: string;

  @IsString()
  @IsOptional()
  compensationFund: string;

  @IsString()
  @IsOptional()
  workCity: string;

  @IsString()
  @IsOptional()
  riskGrade: string;

  @IsString()
  @IsOptional()
  transportationAssistance: string;

  @IsString()
  @IsOptional() 
  contractStartDate: Date;

  @IsString()
  @IsOptional()
  probableRetirementDate: Date;

  @IsString()
  @IsOptional()
  contractEndDate: Date;

  @IsString()
  @IsOptional()
  arl: string | null;

  @IsNumber()
  idTri: number;

}
