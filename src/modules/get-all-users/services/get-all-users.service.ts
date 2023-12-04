/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';
import {Admin} from '../../admin/entities/admin.entity';
import {AdminClient} from '../../admin-client/entities/adminClient.entity';
import {Client} from '../../clients/entities/client.entity';
import {Payroll} from '../../payroll/entities/payroll.entity';
import {UserDocument, UserEntity} from '../../users/entities/user.entity';
import {UserDto} from '../dto/filter-user.dto';

@Injectable()
export class GetAllUsersService {
    constructor(
        @InjectModel(Admin.name) private readonly adminModel: Model<Admin>,
        @InjectModel(AdminClient.name) private readonly adminClientModel: Model<AdminClient>,
        @InjectModel(Client.name) private readonly clientModel: Model<Client>,
        @InjectModel(Payroll.name) private readonly payrollModel: Model<Payroll>,
        @InjectModel(UserEntity.name) private readonly userModel: Model<UserDocument>,
    ) {
    }

    async getAllUsers(): Promise<any[]> {
        const admins = await this.adminModel.find().exec();
        const adminClients = await this.adminClientModel.find().exec();
        const clients = await this.clientModel.find().exec();
        const payrolls = await this.payrollModel.find().exec();

        return [...admins, ...adminClients, ...clients, ...payrolls];
    }

    async getUsersByPage(page: number, limit: number): Promise<any[]> {

        const dataUsers = await this.userModel.aggregate([
            {
                $lookup: {
                    from: 'roles',
                    localField: 'role',
                    foreignField: '_id',
                    as: 'role',
                },
            },
            {
                $lookup: {
                    from: 'admins',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'admins',
                },
            },
            {
                $lookup: {
                    from: 'admin-clients',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'admin_clients',
                },
            },
            {
                $lookup: {
                    from: 'clients',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'clients',
                },
            },
            {
                $lookup: {
                    from: 'payrolls',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'payrolls',
                },
            },
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: limit,
            },
        ])
            .allowDiskUse(true);

        const totalUsers = await this.userModel.countDocuments().exec();
        const totalPages = Math.ceil(totalUsers / limit)

        const createdAtComparator = (a, b) => {
            return a.createdAt - b.createdAt;
        };

        const users: any = {};
        users.total = totalUsers;
        users.pages = totalPages;
        users.data = dataUsers;
        users.data.sort(createdAtComparator);

        return users;

    }


    async getUsersByPageFilterDocumentName(page: number, limit: number, filter: string): Promise<any[]> {

        const dataUsers = await this.userModel.aggregate([
            {
                $match: {
                    $or: [
                        {
                            documentNumber: {
                                $regex: filter,
                                $options: 'i',
                            }
                        },
                        {
                            name: {
                                $regex: filter,
                                $options: 'i',
                            }
                        },
                    ]
                }
            },
            {
                $lookup: {
                    from: 'roles',
                    localField: 'role',
                    foreignField: '_id',
                    as: 'role',
                },
            },
            {
                $lookup: {
                    from: 'admins',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'admins',
                },
            },
            {
                $lookup: {
                    from: 'admin-clients',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'admin_clients',
                },
            },
            {
                $lookup: {
                    from: 'clients',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'clients',
                },
            },
            {
                $lookup: {
                    from: 'payrolls',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'payrolls',
                },
            },
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: limit,
            },
        ])
            .allowDiskUse(true);

        const totalUsers = await this.userModel.countDocuments({
            $or: [
                {
                    documentNumber: {
                        $regex: filter,
                        $options: 'i',
                    }
                },
                {
                    name: {
                        $regex: filter,
                        $options: 'i',
                    }
                },
            ]
        }).exec();
        const totalPages = Math.ceil(totalUsers / limit)

        const createdAtComparator = (a, b) => {
            return a.createdAt - b.createdAt;
        };

        const users: any = {};
        users.total = totalUsers;
        users.pages = totalPages;
        users.data = dataUsers;
        users.data.sort(createdAtComparator);

        return users;
    }


    async getUsersByFilters(page: number, limit: number, user: UserDto): Promise<any[]> {

        const emailRegex = user.email ? {$regex: user.email, $options: 'i'} : undefined;

        const dataUsers = await this.userModel.aggregate([
            {
                $match: {
                    $and: [
                        ...(emailRegex ? [{email: emailRegex}] : []),
                        ...(user.createdAt ? [{
                            createdAt: {
                                $gte: new Date(user.createdAt + 'T00:00:00.000Z'),
                                $lte: new Date(user.createdAt + 'T23:59:59.999Z')
                            }
                        }] : []),
                        ...(user.role ? [{role: user.role}] : []),
                        ...(user.state ? [{state: user.state}] : []),
                    ]
                }
            },
            {
                $lookup: {
                    from: 'roles',
                    localField: 'role',
                    foreignField: '_id',
                    as: 'role',
                },
            },
            {
                $lookup: {
                    from: 'admins',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'admins',
                },
            },
            {
                $lookup: {
                    from: 'admin-clients',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'admin_clients',
                },
            },
            {
                $lookup: {
                    from: 'clients',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'clients',
                },
            },
            {
                $lookup: {
                    from: 'payrolls',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'payrolls',
                },
            },
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: limit,
            },
        ])
            .allowDiskUse(true);


        const totalUsers = dataUsers.length;
        const totalPages = Math.ceil(dataUsers.length / limit)

        const createdAtComparator = (a, b) => {
            return a.createdAt - b.createdAt;
        };

        const users: any = {};
        users.total = totalUsers;
        users.pages = totalPages;
        users.data = dataUsers;
        users.data.sort(createdAtComparator);

        return users;
    }

    async findBy(
        page: number,
        limit: number,
        by: string,
        value: string | number,
    ): Promise<UserDto[]> {
        let matchStage: any = {};

        if (by !== 'find' && value !== 'all') {
            let query: any = {};

            if (typeof value === 'string' && !isNaN(Number(value))) {
                query = { [by]: Number(value) };
            } else if (typeof value === 'string') {
                if (Types.ObjectId.isValid(value)) {
                    query = { [by]: value };
                } else {
                    query = { [by]: { $regex: new RegExp(value, 'i') } };
                }
            } else if (typeof value === 'number') {
                query = { [by]: value };
            }

            matchStage = query;
        }

        const total = by === 'find' && value === 'all'
            ? await this.userModel.countDocuments().exec()
            : await this.userModel.countDocuments(matchStage).exec();
        const totalPages = Math.ceil(total / limit);

        const aggregatePipeline: any[] = [];

        if (Object.keys(matchStage).length > 0) {
            aggregatePipeline.push({ $match: matchStage });
        }
        aggregatePipeline.push(
            {
                $lookup: {
                    from: 'roles',
                    localField: 'role',
                    foreignField: '_id',
                    as: 'role',
                },
            },
            { $match: { 'role.fieldToMatch': value } },
            {
                $lookup: {
                    from: 'admins',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'admins',
                },
            },
            { $match: { 'admins.fieldToMatch': value } },
            {
                $lookup: {
                    from: 'admin-clients',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'admin_clients',
                },
            },
            { $match: { 'admin_clients.fieldToMatch': value } },
            {
                $lookup: {
                    from: 'clients',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'clients',
                },
            },
            { $match: { 'clients.fieldToMatch': value } },
            {
                $lookup: {
                    from: 'payrolls',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'payrolls',
                },
            },
            { $match: { 'payrolls.fieldToMatch': value } },
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: limit,
            },
        );

        const data = await this.userModel.aggregate(aggregatePipeline).allowDiskUse(true);

        const users: any = {};
        users.total = total;
        users.pages = totalPages;
        users.data = data;

        return users;
    }
}
