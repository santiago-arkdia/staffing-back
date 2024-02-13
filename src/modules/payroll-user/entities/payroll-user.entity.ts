/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {ModuleParameterization} from 'src/modules/module-parameterization/entities/module-parameterization.entity';
import {UserEntity} from 'src/modules/users/entities/user.entity';

@Schema({timestamps: true})
export class PayrollUser {
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

export const PayrollUserSchema = SchemaFactory.createForClass(PayrollUser);
