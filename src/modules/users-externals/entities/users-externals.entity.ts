/* eslint-disable prettier/prettier */
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {HydratedDocument} from 'mongoose';
import {Roles} from 'src/modules/roles/entities/roles.entity';

export type UserDocument = HydratedDocument<UserExternal>;

@Schema({collection: 'users-external', timestamps: true})
export class UserExternal {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Types.ObjectId;

    @Prop({type: String, required: true, unique: true, index: true})
    user: string;

    @Prop({type: String, required: true})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserExternal);
