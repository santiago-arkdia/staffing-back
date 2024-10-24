/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {Collaborator} from 'src/modules/collaborators/entities/collaborators.entity';
import {Concept} from "../../concepts/entities/concepts.entity";
import { Documents } from 'src/shared/models/documents';
import { Comment } from 'src/shared/models/commet';
import { Client } from 'src/modules/clients/entities/client.entity';
// import { UtilityCenters } from 'src/modules/business-configuration/utility-center/entities/utility-center.entity';
// import { CostCenters } from 'src/modules/business-configuration/centers-costs/entities/centers-costs.entity';

@Schema({timestamps: true})
export class Novelty {

    _id
    
    @Prop({type: Number, unique: true, immutable: true})
    uid: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Client'})
    client: Client;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Collaborator'})
    collaborator: Collaborator;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Concept'})
    concept: Concept;

    @Prop({type: Number, default: 2})
    state: number;

    @Prop({ type: Object })
    reportingObject: Record<string, any>;

    @Prop([Documents])
    documents: Documents[];

    @Prop([Comment])
    comments: Comment[];

    @Prop({type: String})
    typeNovelty: string;

    @Prop({type: String})
    contract: string;

    @Prop({type: String})
    responseTemporApp: string;

    @Prop({type: String})
    payloadTemporApp: string;

    
    @Prop({type: Array, required: true})
    approves: any[];

    @Prop({type: String})
    moduleApprove: string;
    
    
}

export const NoveltySchema = SchemaFactory.createForClass(Novelty);