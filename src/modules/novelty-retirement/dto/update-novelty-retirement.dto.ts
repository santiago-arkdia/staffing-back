/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { CreateNoveltyRetirementDto } from './create-novelty-retirement.dto';
import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

@Schema()
@Schema()
export class UpdateConceptsRetirementDto extends PartialType(CreateNoveltyRetirementDto) {

    @IsNumber()
    @IsOptional()
    outDate: number;
}
