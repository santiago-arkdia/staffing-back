/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsArray, IsNumber, IsOptional, IsString} from 'class-validator';
import {ModuleParameterization} from 'src/modules/module-parameterization/entities/module-parameterization.entity';

@Schema()
export class UpdateAdminClientsDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsNumber()
    phone: number;

    @IsOptional()
    @IsString()
    user: string;

    @IsNumber()
    @IsOptional()
    state: number;

    @IsOptional()
    @IsArray()
    moduleParameterization: ModuleParameterization[];
}
