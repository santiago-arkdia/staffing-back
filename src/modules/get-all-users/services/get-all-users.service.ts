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
        user: UserDto,
        roleKey: string
    ): Promise<UserDto[]> {
        let matchStage: any = {};
        let unwindStages = [];


        // Roles 
        // Supervisor_role
        // Nommbres
        // Documento
        // Mallas horarias
        // 

        if (user.email) {
            matchStage.email = { $regex: new RegExp(user.email, 'i') };
        }

        if (user.state) {
            matchStage.state = { $regex: new RegExp(user.state, 'i') };
        }


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
        );

        if(user.name){
            aggregatePipeline.push({
                $match: {
                    $or: [
                        { 'admins.name': user.name },
                        { 'admin_clients.name': user.name },
                        { 'clients.name': user.name },
                        { 'payrolls.name': user.name },
                    ]
                }
            });
        }


        if(user.documentNumber){
            aggregatePipeline.push({
                $match: {
                    $or: [
                        { 'admins.documentNumber': user.documentNumber },
                        { 'admin_clients.documentNumber': user.documentNumber },
                        { 'clients.documentNumber': user.documentNumber },
                        { 'payrolls.documentNumber': user.documentNumber },
                    ]
                }
            });
        }


        if(roleKey){
            aggregatePipeline.push({
                $match: {
                    $or: [
                        { 'role.role_key': roleKey },
                        { 'role.supervisor_role': roleKey },
                    ]
                }
            });
        }


        aggregatePipeline.push({
            $count: 'total'
        });

        const countResult = await this.userModel.aggregate(aggregatePipeline);
        const totalUsers = countResult.length > 0 ? countResult[0].total : 0;
        console.log(totalUsers+"totalUsers");

        const totalPages = Math.ceil(totalUsers / limit);

        aggregatePipeline.pop();
        aggregatePipeline.push(
            { $skip: (page - 1) * limit },
            { $limit: limit }
        );

        const data = await this.userModel.aggregate(aggregatePipeline).allowDiskUse(true);

        const users: any = {};
        users.total = totalUsers;
        users.pages = totalPages;
        users.data = data;

        return users;
    }
}
