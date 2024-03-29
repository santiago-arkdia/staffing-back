/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({collection: 'categories-novelties-retirement', timestamps: true})
export class CategoriesSocialSecurity {

    @Prop({type: String, required: true})
    name: string;

    @Prop({type: Number, default: 1})
    state: number;

}

export const CategoriesSocialSecuritySchema = SchemaFactory.createForClass(CategoriesSocialSecurity);
