/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Documents } from 'src/shared/models/documents';
import { Contract } from 'src/shared/models/contract';
import { UtilityCenters } from 'src/modules/business-configuration/utility-center/entities/utility-center.entity';
import { CostCenters } from 'src/modules/business-configuration/centers-costs/entities/centers-costs.entity';
import { ConceptsSocialSecurity } from 'src/modules/concepts-social-security/entities/concepts-social-security.entity';
import { Collaborator } from 'src/modules/collaborators/entities/collaborators.entity';

@Schema({collection: 'novelty-social-security', timestamps: true})
export class NoveltySocialSecurity {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Collaborator'})
    collaborator: Collaborator;

    @Prop({type: String})
    motive: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'UtilityCenters'})
    utilityCenter: UtilityCenters;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'CostCenters'})
    centersCosts: CostCenters;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'ConceptsSocialSecurity'})
    conceptSocialSecurity: ConceptsSocialSecurity;

    @Prop({type: Date})
    startDate: Date;

    @Prop({type: Date})
    endDate: Date;
    
    @Prop({type: String})
    previousPeriod: string;

    @Prop([Documents])
    hours: Documents[];

    @Prop([Contract])
    units: Contract[];

    @Prop({type: Number})
    minutes: number;

    @Prop({type: Number})
    observations: number;

    @Prop({type: Number})
    file: number;

    @Prop({type: Number, default: 2})
    state: number;

    @Prop({type: Number, default: 0})
    outDate: number;

}

export const NNoveltySocialSecuritySchema = SchemaFactory.createForClass(NoveltySocialSecurity);