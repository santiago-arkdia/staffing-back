/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {CreateUserDto} from '../dto/create-users-externals.dto';
import {UserDocument, UserExternal} from '../entities/users-externals.entity';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type User = any;

@Injectable()
export class UsersExternalService {
    constructor(
        @InjectModel(UserExternal.name)
        private readonly userExternal: Model<UserExternal>,
    ) {
    }

    async create(user: CreateUserDto): Promise<UserExternal> {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(user.password, salt);
        const createdUser = new this.userExternal({...user, password: hashedPassword})
        return await createdUser.save();
    }


    async findByUser(users: string): Promise<UserExternal | null> {
        try {
            const user = await this.userExternal.findOne({user: users}).exec();
            return user;
        } catch (error) {
            throw new Error(`Error searching for user by email: ${error.message}`);
        }
    }

}
