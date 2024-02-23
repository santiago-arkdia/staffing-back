/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsOptional, IsString} from 'class-validator';

@Schema()
export class CreateJobPositionsDto {

    @IsString()
    @IsOptional()
    region: string;

    @IsString()
    @IsOptional()
    utilityCenter: string;

    @IsString()
    @IsOptional()
    centersCosts: string;

    @IsString()
    @IsOptional()
    hourlyMeshes: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    responsibility: string;

    @IsString()
    @IsOptional()
    objective: string;


    @IsString()
    @IsOptional()
    arl: string;

}
