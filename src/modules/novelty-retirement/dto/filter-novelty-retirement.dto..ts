/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsOptional, IsString} from 'class-validator';

@Schema()
export class FilterNoveltyDto {
    @IsString()
    @IsOptional()
    collaborator: string;

    @IsString()
    @IsOptional()
    conceptsRetirement: string;
}