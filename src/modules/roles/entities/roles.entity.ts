/* eslint-disable prettier/prettier */
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';

@Schema({timestamps: true})
export class Roles {
    @Prop({type: String, required: true})
    role_key: string;

    @Prop({type: String, required: true})
    role_value: string;

    @Prop({type: String, required: true})
    role_type: string;

    @Prop({type: String, required: true})
    supervisor_role: string;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
