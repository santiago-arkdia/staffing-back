/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsNumber, IsOptional, IsString} from 'class-validator';

@Schema()
export class FilterNoveltyDto {
    @IsString()
    @IsOptional()
    collaborator: string;

    @IsString()
    @IsOptional()
    conceptsRetirement: string;

    @IsNumber()
    @IsOptional()
    outDate: number;
}