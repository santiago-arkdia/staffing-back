/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Admin } from 'src/modules/admin/entities/admin.entity';
import {ModuleParameterization} from 'src/modules/module-parameterization/entities/module-parameterization.entity';
import { Puc } from 'src/modules/puc/entities/puc.entity';
import {UserEntity} from 'src/modules/users/entities/user.entity';
import { AccountingInterface } from 'src/modules/accounting-interface/entities/accounting-interface.entity';

@Schema({timestamps: true})
export class Client {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String})
    nit: string;

    @Prop()
    state: number;

    @Prop()
    cutoffDate: number;

    @Prop({type: Number})
    idTri: number;

    @Prop({type: mongoose.Schema.Types.Array, ref: 'Admin'})
    analysts: Admin[];

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: UserEntity;

    @Prop({type: mongoose.Schema.Types.Array, ref: 'ModuleParameterization'})
    moduleParameterization: ModuleParameterization[];

    @Prop({type: mongoose.Schema.Types.Array, ref: 'Puc'})
    conceptsPuc: any[];

    @Prop({ type: mongoose.Schema.Types.Array, ref: 'AccountingInterface' })
    accountingInterface: AccountingInterface[];

}

export const ClientSchema = SchemaFactory.createForClass(Client);
