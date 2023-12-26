/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {Collaborator} from 'src/modules/collaborators/entities/collaborators.entity';
import { Documents } from 'src/shared/models/documents';
import { Contract } from 'src/shared/models/contract';
import { ConceptsRetirement } from 'src/modules/concepts-retirement/entities/concepts-retirement.entity';

@Schema({collection: 'novelty-retirement', timestamps: true})
export class NoveltyRetirement {

    @Prop({type: Number, unique: true, immutable: true})
    uid: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Collaborator'})
    collaborator: Collaborator;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'ConceptsRetirement'})
    conceptsRetirement: ConceptsRetirement;

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

}

export const NNoveltyRetirementSchema = SchemaFactory.createForClass(NoveltyRetirement);