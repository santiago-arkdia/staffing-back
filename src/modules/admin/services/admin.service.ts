/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Admin} from '../entities/admin.entity';
import {AdminsDto} from '../dto/admin.dto';
import {FilterAdminsDto} from '../dto/filter-admin.dto.';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
    ) {
    }

    async create(admin: AdminsDto): Promise<Admin> {
        const createdAdmin = new this.adminModel(admin);
        return await createdAdmin.save();
    }

    async update(id: string, admin: AdminsDto): Promise<Admin> {
        return await this.adminModel.findByIdAndUpdate(id, admin, {new: true});
    }

    async getAll(): Promise<Admin[]> {
        
        const admins = await this.adminModel
            .find()
            .populate({
                path: 'user',
                populate: {
                    path: 'role',
                },
            })
            .exec();

        return admins;
    }

    async findAll(page: number, limit: number): Promise<Admin[]> {

        const total = await this.adminModel.countDocuments().exec();
        const totalPages = Math.ceil(total / limit)

        const admins = await this.adminModel
            .find()
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({
                path: 'user',
                populate: {
                    path: 'role',
                },
            })
            .exec();

        const admin: any = {};
        admin.total = total;
        admin.pages = totalPages;
        admin.data = admins;

        return admin;
    }

    async findOne(id: string): Promise<Admin> {
        return await this.adminModel
            .findById(id)
            .populate({
                path: 'user',
                populate: {
                    path: 'role',
                },
            })
            .exec();
    }
    

    async findBy(by: string, value: string, key: string): Promise<Admin[]> {
        if (key) {
            const query = {
                [key]: {
                    $elemMatch: {
                        [by]: value,
                    },
                },
            };
            return await this.adminModel
                .find(query)
                .populate({
                    path: 'user',
                    populate: {
                        path: 'role',
                    },
                })
                .exec();
        } else {
            const query = {[by]: value};
            return await this.adminModel
                .find(query)
                .populate({
                    path: 'user',
                    populate: {
                        path: 'role',
                    },
                })
                .exec();
        }
    }

    async getAdminsByFilters(page: number, limit: number, filter: FilterAdminsDto): Promise<Admin[]> {

        const query: any = {};

        if (filter.name) {
            query.name = {$regex: filter.name, $options: 'i'};
        }

        if (filter.lastName) {
            query.lastName = {$regex: filter.lastName, $options: 'i'};
        }

        if (filter.state) {
            query.state = filter.state;
        }

        const admins = await this.adminModel
            .find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({
                path: 'user',
                populate: {
                    path: 'role',
                },
            })
            .exec();

        const total = await this.adminModel.countDocuments(query).exec();
        const totalPages = Math.ceil(total / limit)

        const admin: any = {};
        admin.total = total;
        admin.pages = totalPages;
        admin.data = admins;

        return admin;
    }
}
