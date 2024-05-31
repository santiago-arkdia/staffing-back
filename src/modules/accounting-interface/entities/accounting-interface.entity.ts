/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Client } from 'src/modules/clients/entities/client.entity';

@Schema({timestamps: true})
export class AccountingInterface {
    @Prop({type: String, required: true})
    payroll: string;

    @Prop({type: String})
    socialSecurity: string;

    @Prop({type: String})
    reteSource: string;

    @Prop({type: String})
    month: string;

    @Prop({type: String})
    year: string;

    @Prop({type: String})
    time: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Client'})
    client: Client;
    
    @Prop({type: String})
    acountingInterface: string;

    @Prop({type: Number})
    state: number;

}

export const AccountingInterfaceSchema = SchemaFactory.createForClass(AccountingInterface);
