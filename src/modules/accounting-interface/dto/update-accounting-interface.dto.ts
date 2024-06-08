/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsArray, IsJSON, IsOptional, IsString} from 'class-validator';
import { CreateAccountingInterfaceDto } from './create-accounting-interface.dto';
import { PartialType } from '@nestjs/swagger';

@Schema()
export class UpdateAccountingInterfaceDto  extends PartialType (CreateAccountingInterfaceDto) {

    @IsOptional()
    @IsArray()
    comments: Comment[];
}