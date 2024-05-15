/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import { Client } from 'src/modules/clients/entities/client.entity';
import mongoose from 'mongoose';

@Schema({timestamps: true})
export class Puc {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    concept: string;

    @Prop({type: String, required: true})
    code: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Client'})
    client: Client;

    @Prop({type: Number, default: 1})
    state: number;

}

export const PucSchema = SchemaFactory.createForClass(Puc);
