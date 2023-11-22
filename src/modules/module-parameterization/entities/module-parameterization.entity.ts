/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({collection: 'module-parameterization', timestamps: true})
export class ModuleParameterization {
    @Prop({type: String, required: true})
    module: string;

    @Prop({type: String, required: true})
    subModule: string;

    @Prop()
    active: boolean;

    @Prop({type: String, required: true})
    path: string;

    @Prop({type: String})
    role: string;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const ModuleParameterizationSchema = SchemaFactory.createForClass(ModuleParameterization,);
