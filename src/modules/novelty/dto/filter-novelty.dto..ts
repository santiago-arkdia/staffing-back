/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsNumber, IsOptional, IsString} from 'class-validator';

@Schema()
export class FilterNoveltyDto {
    @IsString()
    @IsOptional()
    numberInability: string;

    @IsString()
    @IsOptional()
    typeOfAttention: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsOptional()
    state: number;
}
