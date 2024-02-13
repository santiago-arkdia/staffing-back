/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Documents } from 'src/shared/models/documents';
import { UtilityCenters } from 'src/modules/business-configuration/utility-center/entities/utility-center.entity';
import { CostCenters } from 'src/modules/business-configuration/centers-costs/entities/centers-costs.entity';
import { ConceptsSocialSecurity } from 'src/modules/concepts-social-security/entities/concepts-social-security.entity';
import { Collaborator } from 'src/modules/collaborators/entities/collaborators.entity';
import { Client } from 'src/modules/clients/entities/client.entity';


// class Contract {

//     @Prop({ type: String })
//     id: string;
  
//     @Prop({ type: String })
//     observation: string;
  
//     @Prop({ type: String })
//     file: string;
// }

@Schema({collection: 'novelty-social-security', timestamps: true})
export class NoveltySocialSecurity {

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Client'})
    client: Client;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Collaborator'})
    collaborator: Collaborator;

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

    @Prop({type: String})
    observations: string;

    @Prop([Documents])
    documents: Documents[];

    @Prop({type: Number})
    contract: number;

    @Prop({type: Number, default: 2})
    state: number;

    @Prop({type: Number, default: 0})
    outDate: number;

}

export const NNoveltySocialSecuritySchema = SchemaFactory.createForClass(NoveltySocialSecurity);