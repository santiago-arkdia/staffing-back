/* eslint-disable prettier/prettier */
import {Schema} from '@nestjs/mongoose';
import {IsBoolean, IsOptional, IsString} from 'class-validator';

@Schema()
export class CreateModuleParameterizationsDto {
    @IsString()
    @IsOptional()
    module: string;

    @IsString()
    @IsOptional()
    subModule: string;

    @IsBoolean()
    @IsOptional()
    active: boolean;

    @IsString()
    @IsOptional()
    path: string;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Roles' })
    // role: Roles;
    @IsString()
    @IsOptional()
    role: string;
}
