/* eslint-disable prettier/prettier */
import { Schema } from '@nestjs/mongoose';
import { CreateNoveltySocialSecurityDto } from './create-novelty-social-security.dto';
import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

@Schema()
@Schema()
export class UpdateConceptsSocialSecurityDto extends PartialType(CreateNoveltySocialSecurityDto) {

    @IsNumber()
    @IsOptional()
    outDate: number;
}
