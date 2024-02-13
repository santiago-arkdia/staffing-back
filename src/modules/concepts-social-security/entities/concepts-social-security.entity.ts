/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CategoriesSocialSecurity } from 'src/modules/categories-social-security/entities/categories-social-security.entity';

@Schema({timestamps: true})
export class ConceptsSocialSecurity {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true})
    manages: string;

    @Prop({type: String})
    approves: string;

    @Prop({type: String, required: true})
    measurement: string;

    @Prop({type: Number, default: 1})
    state: number;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'CategoriesSocialSecurity'})
    categoriesSocialSecurity: CategoriesSocialSecurity;

}

export const ConceptsSocialSecuritySchema = SchemaFactory.createForClass(ConceptsSocialSecurity);
