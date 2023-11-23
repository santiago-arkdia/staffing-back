/* eslint-disable prettier/prettier */
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
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
                    as: 'adminClients',
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
                    as: 'adminClients',
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
                    as: 'adminClients',
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

}
