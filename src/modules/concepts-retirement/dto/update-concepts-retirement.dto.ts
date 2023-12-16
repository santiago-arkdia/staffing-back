/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsJSON, IsString} from 'class-validator';

@Schema()
export class UpdateConceptsRetirementDto {
    @IsString()
    name: string;
}
