/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CategoriesSocialSecurityController } from 'src/modules/categories-social-security/controllers/categories-social-security.controller';

@Schema({timestamps: true})
export class ConceptsSocialSecurity {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    manages: string;

    @Prop({type: String})
    approves: string;

    @Prop({type: Number, default: 1})
    state: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'CategoriesSocialSecurity'})
    categoriesSocialSecurity: CategoriesSocialSecurityController;

}

export const ConceptsSocialSecuritySchema = SchemaFactory.createForClass(ConceptsSocialSecurity);
