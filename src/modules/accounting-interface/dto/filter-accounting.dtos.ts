import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsIn, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { CreateAccountingInterfaceDto } from "./create-accounting-interface.dto";



export class FilterInterfaceDto extends PartialType (CreateAccountingInterfaceDto) {

  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  page: number;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc';

}
