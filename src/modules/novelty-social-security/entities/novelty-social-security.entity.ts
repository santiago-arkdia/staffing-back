/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {Collaborator} from 'src/modules/collaborators/entities/collaborators.entity';
import { Documents } from 'src/shared/models/documents';
import { Contract } from 'src/shared/models/contract';
import { ConceptsSocialSecurity } from 'src/modules/concepts-social-security/entities/concepts-social-security.entity';

@Schema({collection: 'novelty-retirement', timestamps: true})
export class NoveltySocialSecurity {

    @Prop({type: Number, unique: true, immutable: true})
    uid: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Collaborator'})
    collaborator: Collaborator;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'ConceptsSocialSecurity'})
    conceptsSocialSecurity: ConceptsSocialSecurity;

    @Prop({type: Date})
    finishDate: Date;

    @Prop({type: Date})
    endDate: Date;
    
    @Prop()
    note: string;

    @Prop([Documents])
    documents: Documents[];

    @Prop([Contract])
    contract: Contract[];

    @Prop({type: Number})
    signedByApprover: number;

    @Prop({type: Number})
    signedByManagment: number;

    @Prop({type: Number})
    signedByCollaborator: number;

    @Prop({type: Number})
    loadedOnPayroll: number;

    @Prop({type: Array})
    comments: any[];

    @Prop({type: Number, default: 2})
    state: number;

    @Prop({type: Number, default: 0})
    outDate: number;

}

export const NNoveltySocialSecuritySchema = SchemaFactory.createForClass(NoveltySocialSecurity);