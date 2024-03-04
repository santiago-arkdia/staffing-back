/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { NoveltyRetirement } from 'src/modules/novelty-retirement/entities/novelty-retirement.entity';
import { NoveltySocialSecurity } from 'src/modules/novelty-social-security/entities/novelty-social-security.entity';
import { Novelty } from 'src/modules/novelty/entities/novelty.entity';
import { Documents } from 'src/shared/models/documents';
import { Comment } from 'src/shared/models/commet';
import { Client } from 'src/modules/clients/entities/client.entity';

@Schema({timestamps: true})
export class Payrolls {

    @Prop({type: Number})
    consecutive: number;

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Novelty'}])
    novelties: Novelty[];

    @Prop({type: String})
    month: string;

    @Prop({type: String})
    year: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Client'})
    client: Client;

    @Prop()
    approvedByClient: Date;

    @Prop()
    sendToApproved: Date;

    @Prop()
    dateApproved: Date;

    @Prop({type: Number})
    state: number;

    @Prop([Comment])
    comments: Comment[];

    @Prop({type: String})
    document: string;

    @Prop({type: String})
    pathPayroll: string;

}

export const PayrollsSchema = SchemaFactory.createForClass(Payrolls);
