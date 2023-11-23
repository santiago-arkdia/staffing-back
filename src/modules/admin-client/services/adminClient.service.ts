/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {AdminClient} from '../entities/adminClient.entity';
import {CreateClientsDto} from '../dto/create-adminClient.dto';
import {FilterAdminClientsDto} from '../dto/filter-admin.dto.';
import {UpdateAdminClientsDto} from "../dto/update-admin-client.dto";

@Injectable()
export class ClientService {
    constructor(
        @InjectModel(AdminClient.name)
        private readonly adminClientModel: Model<AdminClient>,
    ) {
    }

    async create(client: CreateClientsDto): Promise<AdminClient> {
        const createdClient = new this.adminClientModel(client);
        return await createdClient.save();
    }

    async update(id: string, client: UpdateAdminClientsDto): Promise<UpdateAdminClientsDto> {
        return this.adminClientModel.findByIdAndUpdate(id, client, {new: true});
    }

    async findAll(page: number, limit: number): Promise<AdminClient[]> {

        const total = await this.adminClientModel.countDocuments().exec();
        const totalPages = Math.ceil(total / limit)

        const adminClients = await this.adminClientModel.find()
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({
                path: 'user',
                populate: {
                    path: 'role',
                },
            })
            .exec();

        const adminClient: any = {};
        adminClient.total = total;
        adminClient.pages = totalPages;
        adminClient.data = adminClients;

        return adminClient;
    }

    async findOne(id: string): Promise<AdminClient> {
        return await this.adminClientModel
            .findById(id)
            .populate({
                path: 'user',
                populate: {
                    path: 'role',
                },
            })
            .exec();
    }

    async findBy(by: string, value: string): Promise<AdminClient[]> {
        const query = {[by]: value};
        return await this.adminClientModel
            .find(query)
            .populate({
                path: 'user',
                populate: {
                    path: 'role',
                },
            })
            .exec();
    }

    async getAdminsClientsByFilters(page: number, limit: number, filter: FilterAdminClientsDto): Promise<AdminClient[]> {

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

        const admins = await this.adminClientModel
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

        const total = await this.adminClientModel.countDocuments(query).exec();
        const totalPages = Math.ceil(total / limit)

        const admin: any = {};
        admin.total = total;
        admin.pages = totalPages;
        admin.data = admins;

        return admin;
    }

}
