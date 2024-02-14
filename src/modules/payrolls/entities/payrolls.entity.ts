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

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Novelty'}])
    novelties: Novelty[];

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'NoveltyRetirement'}])
    noveltiesRetirement: NoveltyRetirement[];

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'NoveltySocialSecurity'}])
    noveltiesSocialSecurity: NoveltySocialSecurity[];

    @Prop({type: String})
    month: string;

    @Prop({type: String})
    year: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Client'})
    client: Client;

    @Prop()
    approvedByClient: Date;

    @Prop()
    sendtobeApproved: Date;

    @Prop({type: Number, default: 0})
    state: number;

    @Prop([Comment])
    comments: Comment[];

    @Prop([Documents])
    documents: Documents[];
}

export const PayrollsSchema = SchemaFactory.createForClass(Payrolls);
