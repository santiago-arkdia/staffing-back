/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {CategoriesNovelty} from 'src/modules/categories-novelty/entities/categories-novelties.entity';
import {Collaborator} from 'src/modules/collaborators/entities/collaborators.entity';
import {Diagnosis} from 'src/modules/diagnosis/entities/diagnosis.entity';
import {Eps} from 'src/modules/eps/entities/eps.entity';

export class CommentObject {
    comment: string;
    user: string;
    date: string;
}

@Schema({timestamps: true})
export class Novelty {

    @Prop({type: Number, unique: true, immutable: true})
    uid: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Collaborator'})
    collaborator: Collaborator;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'CategoriesNovelty'})
    categoryNovelty: CategoriesNovelty;

    @Prop()
    numberInability: string;

    @Prop({type: Date})
    initialDate: Date;

    @Prop({type: Date})
    finalDate: Date;

    @Prop()
    typeOfAttention: string;

    @Prop()
    extension: boolean;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Eps'})
    eps: Eps;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Diagnosis'})
    diagnosis: Diagnosis;

    @Prop()
    description: string;

    @Prop()
    documents: string[];

    @Prop([CommentObject])
    comments: CommentObject[];

    @Prop({type: Number, default: 2})
    state: number;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const NoveltySchema = SchemaFactory.createForClass(Novelty);
