/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {Collaborator} from 'src/modules/collaborators/entities/collaborators.entity';
import {Concept} from "../../concepts/entities/concepts.entity";
import { Documents } from 'src/shared/models/documents';
import { Comment } from 'src/shared/models/commet';
import { Client } from 'src/modules/clients/entities/client.entity';
import { UtilityCenters } from 'src/modules/business-configuration/utility-center/entities/utility-center.entity';
import { CostCenters } from 'src/modules/business-configuration/centers-costs/entities/centers-costs.entity';

@Schema({timestamps: true})
export class Novelty {

    @Prop({type: Number, unique: true, immutable: true})
    uid: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Client'})
    client: Client;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Collaborator'})
    collaborator: Collaborator;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Concept'})
    concept: Concept;

    @Prop({type: Date})
    date: Date;

    @Prop()
    description: string;

    @Prop()
    contract: string;

    @Prop([Documents])
    documents: Documents[];

    @Prop([Comment])
    comments: Comment[];

    @Prop({type: Number, default: 2})
    state: number;

    @Prop({type: Number, default: 0})
    outDate: number;

    @Prop({type: Number, default: 0})
    type: number;

    @Prop({ type: Object })
    more: Record<string, any>;






    @Prop({type: Date})
    finishDate: Date;

    @Prop({type: Date})
    endDate: Date;
    
    @Prop()
    note: string;

    @Prop({type: Number})
    signedByApprover: number;

    @Prop({type: Number})
    signedByManagment: number;

    @Prop({type: Number})
    signedByCollaborator: number;

    @Prop({type: Number})
    loadedOnPayroll: number;
    







    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'UtilityCenters'})
    utilityCenter: UtilityCenters;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'CostCenters'})
    centersCosts: CostCenters;

    @Prop({type: Date})
    startDate: Date;


    @Prop({type: String})
    previousPeriod: string;

    @Prop({type: String})
    observations: string;


    @Prop({type: String})
    typeNovelty: string;

    @Prop({type: Number})
    withSupportFile?: number;

    @Prop({type: Boolean})
    isSafeAndSound?: boolean;
    
    @Prop({type: String})
    whoReports?: string;
}

export const NoveltySchema = SchemaFactory.createForClass(Novelty);