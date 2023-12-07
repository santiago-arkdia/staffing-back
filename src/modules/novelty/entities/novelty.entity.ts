/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {CategoriesNovelty} from 'src/modules/categories-novelty/entities/categories-novelties.entity';
import {Collaborator} from 'src/modules/collaborators/entities/collaborators.entity';

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

    @Prop({type: Date})
    date: Date;

    @Prop()
    description: string;

    @Prop()
    contract: string;

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
