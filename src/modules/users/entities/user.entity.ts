/* eslint-disable prettier/prettier */
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';
import {Roles} from 'src/modules/roles/entities/roles.entity';

export type UserDocument = HydratedDocument<UserEntity>;

@Schema({collection: 'users', timestamps: true})
export class UserEntity {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Types.ObjectId;

    @Prop({type: String, required: true, unique: true, index: true})
    email: string;

    @Prop({type: String, required: true})
    password: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Roles'})
    role: Roles;

    @Prop({type: String, required: true})
    image: string;

    @Prop({type: String})
    createdBy: string;

    @Prop({type: Number, default: 1})
    state: number;

    @Prop({ type: Object })
    more: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
