/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {ModuleParameterization} from 'src/modules/module-parameterization/entities/module-parameterization.entity';
import {UserEntity} from 'src/modules/users/entities/user.entity';

@Schema({collection: 'payroll-users', timestamps: true})
export class Payroll {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    lastName: string;

    @Prop()
    documentType: string;

    @Prop()
    documentNumber: number;

    @Prop()
    state: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: UserEntity;

    @Prop({type: mongoose.Schema.Types.Array, ref: 'ModuleParameterization'})
    moduleParameterization: ModuleParameterization[];

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const PayrollSchema = SchemaFactory.createForClass(Payroll);
