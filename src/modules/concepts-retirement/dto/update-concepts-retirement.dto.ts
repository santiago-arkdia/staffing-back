/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsJSON, IsNumber, IsString} from 'class-validator';

@Schema()
export class UpdateConceptsRetirementDto {
    @IsString()
    name: string;

    @IsString()
    categoriesRetirement: string;
    
    @IsNumber()
    state: number;
}
