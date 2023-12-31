/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {Collaborator} from 'src/modules/collaborators/entities/collaborators.entity';
import {Concept} from "../../concepts/entities/concepts.entity";
import { Documents } from 'src/shared/models/documents';
import { Comment } from 'src/shared/models/commet';

@Schema({timestamps: true})
export class Novelty {

    @Prop({type: Number, unique: true, immutable: true})
    uid: number;

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

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const NoveltySchema = SchemaFactory.createForClass(Novelty);